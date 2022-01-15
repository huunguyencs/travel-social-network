import { Backdrop, Button, Card, Fade, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../utils/fetchData';
import * as tourAction from '../../redux/actions/createTourAction';
import { Autocomplete } from '@material-ui/lab';
import { formStyles } from '../../style';
import { Link } from 'react-router-dom';

function ServiceItemAddForm(props) {

    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);

    const { location } = useSelector(state => state);

    const { provinceCache, setProvinceCache, serviceCache, setServiceCache, handleClose } = props;

    const [province, setProvince] = useState(provinceCache);
    const [service, setService] = useState(null);
    const [services, setServices] = useState(serviceCache);
    const [cost, setCost] = useState(0);

    const getServicesInit = async (province, setServices, setServiceCache) => {
        await customAxios().get(`/service/get_by_province/${province._id}`).then(res => {
            setServices(res.data.services);
            setServiceCache(res.data.services);
        }).catch(err => console.log(err))
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

    const handleChangeCost = (e) => {
        setCost(e.target.value)
    }

    const handleSubmit = () => {
        if (service) {
            dispatch(tourAction.addService({
                service: {
                    service: service,
                    cost: parseInt(cost)
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
                    getOptionLabel={(option) => `${option?.name}`}
                    className={classes.autocomplete}
                    onChange={(e, value) => setService(value)}
                    value={service}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn dịch vụ" variant="outlined" />}
                />
            </div>
            {
                service &&
                <div className={classes.description}>
                    <Typography variant='body2'>{service.description}</Typography>
                </div>
            }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                <TextField
                    label="Chi phí (nghìn VND)"
                    variant="outlined"
                    name="cost"
                    id="cost"
                    style={{ width: "100%" }}
                    type={"number"}
                    value={cost}
                    onChange={handleChangeCost}
                />
            </div>
            <div style={{ marginTop: 10 }} className={classes.center}>
                <Button onClick={handleSubmit}>Xong</Button>
            </div>
        </Paper>
    )
}

export function ServiceCard(props) {
    const { service } = props;

    const classes = formStyles();

    return (
        <Card className={classes.serviceCard}>
            <div>
                <img src={service.service.images[0]} alt="Loading..." className={classes.imageService} />
            </div>
            <div className={classes.serviceInfo}>
                <Typography variant='h6' component={Link} to={`/service/${service.service._id}`}>{service.service.name.length > 30 ? service.service.name.slice(0, 30) : service.service.name}</Typography>
                <Typography>Chi phí: {new Intl.NumberFormat().format(service.cost * 1000)} VND</Typography>
            </div>
        </Card>
    )
}

export default function AddService(props) {

    const { services } = useSelector(state => state.createTour);

    const classes = formStyles();

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

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
                    services && services.map((item, index) => (
                        <ServiceCard service={item} key={index} />
                    ))
                }
            </div>
            <div style={{ marginTop: 20 }} className={classes.center}>
                <Button onClick={handleShowForm}>Thêm dịch vụ</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={showForm}
                    onClose={handleCloseForm}
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
                            handleClose={handleCloseForm}
                        />
                    </Fade>
                </Modal>
            </div>
        </>
    )
}
