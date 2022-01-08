import { Backdrop, Button, Card, Fade, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../utils/fetchData';
import * as tourAction from '../../redux/actions/createTourAction';
import { Autocomplete } from '@material-ui/lab';
import { formStyles } from '../../style';

function ServiceItemAddForm(props) {

    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);

    const { location } = useSelector(state => state);

    const { provinceCache, setProvinceCache, serviceCache, setServiceCache, handleClose } = props;

    const [province, setProvince] = useState(provinceCache);
    const [service, setService] = useState(null);
    const [services, setServices] = useState(serviceCache);

    const getServicesInit = async (province, setServices, setServiceCache) => {
        await customAxios().get(`/service/get_by_province/${province._id}`).then(res => {
            setServices(res.data.services);
            setServiceCache(res.data.services);
        })
    }

    useEffect(() => {
        if (provinceCache && services.length === 0 && !isFetch) {
            getServicesInit(provinceCache, setServices, setServiceCache);
            setIsFetch(true);
        }
    }, [provinceCache, setServices, setServiceCache, isFetch, setIsFetch, services])

    const getServices = async (value) => {
        setProvince(value);
        if (value) {
            if (!provinceCache || value._id !== provinceCache._id) {
                setProvinceCache(value);
                await customAxios().get(`/service/get_by_province/${value._id}`).then(res => {
                    setServices(res.data.services);
                    setServiceCache(res.data.services);
                })
            }
            else {
                setServices(serviceCache);
            }
        }
        else {
            setService(null);
            setServices([]);
        }
    }


    const handleSubmit = () => {
        if (service) {
            dispatch(tourAction.addService({
                service: {
                    cooperator: service.cooperator,
                    service: service,
                    cost: service.cost
                }
            }))
            handleClose();
        }
    }

    const classes = formStyles();

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.center}>
                <Typography variant='h6'>Thêm dịch vụ</Typography>
            </div>
            <div className={classes.center}>
                <Autocomplete
                    id="choose-province"
                    options={location.provinces}
                    getOptionLabel={(option) => option?.fullname}
                    className={classes.autocomplete}
                    onChange={(e, value) => getServices(value)}
                    value={province}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                    id="choose-province"
                    options={services}
                    getOptionLabel={(option) => `${option?.name} - ${option?.cost}`}
                    className={classes.autocomplete}
                    onChange={(e, value) => setService(value)}
                    value={service}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn loại dịch vụ" variant="outlined" />}
                />
            </div>
            {
                service &&
                <div>
                    <Typography>{service.cooperator.fullname}</Typography>
                    <Typography>{service.description}</Typography>
                </div>
            }
            <div style={{ marginTop: 10 }} className={classes.center}>
                <Button onClick={handleSubmit}>Xong</Button>
            </div>
        </Paper>
    )
}

function ServiceCard(props) {
    const { service } = props;

    const handleBooking = () => {

    }

    return (
        <Card>
            <Typography>{service.cooperator.fullname}</Typography>
            <Typography>{service.service.name}</Typography>
            <Typography>{new Intl.NumberFormat().format(service.cost) * 1000} VND</Typography>
            <Button onClick={handleBooking}>Đặt trước</Button>
        </Card>
    )
}

export default function AddService(props) {

    const { services } = useSelector(state => state.createTour);

    const classes = formStyles();

    const [showForm, setShowForm] = useState(false);

    const [serviceCache, setServiceCache] = useState([]);
    const [provinceCache, setProvinceCache] = useState(null);

    return (
        <>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Chọn dịch vụ
                </Typography>
            </div>
            <div>
                {
                    services && services.map((item) => (
                        <ServiceCard service={item} />
                    ))
                }
            </div>
            <div style={{ marginTop: 20 }} className={classes.center}>
                <Button onClick={() => setShowForm(true)}>Thêm dịch vụ</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={showForm}
                    onClose={() => setShowForm(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={showForm}>
                        <ServiceItemAddForm
                            provinceCache={provinceCache}
                            setProvinceCache={setProvinceCache}
                            serviceCache={serviceCache}
                            setServiceCache={setServiceCache}
                            handleClose={() => setShowForm(false)}
                        />
                    </Fade>
                </Modal>
            </div>
        </>
    )
}
