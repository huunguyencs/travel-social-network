import { Backdrop, Button, Fade, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../utils/fetchData';
import * as tourAction from '../../redux/actions/createTourAction';
import { Autocomplete } from '@material-ui/lab';
import { formStyles } from '../../style';

function ServiceItemAddForm(props) {

    const dispatch = useDispatch();

    const { location } = useSelector(state => state);

    const { provinceCache, setProvinceCache, serviceCache, setServiceCache, handleClose } = props;

    const [province, setProvince] = useState(provinceCache);
    const [service, setService] = useState(null);
    const [serviceItem, setServiceItem] = useState(null);
    const [services, setServices] = useState(serviceCache);
    const [serviceItems, setServiceItems] = useState([]);

    const getServices = async (value) => {
        setProvince(value);
        if (value) {
            if (!provinceCache || value._id !== provinceCache._id) {
                setProvinceCache(value);
                await customAxios().get().then(res => {
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
            setServiceItem(null);
            setServiceItems([]);
        }
    }

    const getServiceItem = async (value) => {
        if (value) {
            setService(value);
            setServiceItems(value.serviceItem);
        }
        else {
            setServiceItem(null);
            setServiceItems([]);
        }
    }

    const handleSubmit = () => {
        if (service && serviceItem) {
            dispatch(tourAction.addService({
                service: {
                    service: service._id,
                    serviceItem: serviceItem._id,
                    cost: serviceItem.cost
                }
            }))
            handleClose();
        }
    }

    return (
        <Paper style={{ padding: 30, borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6'>Thêm dịch vụ</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                    id="choose-province"
                    options={location.provinces}
                    getOptionLabel={(option) => option?.fullname}
                    style={{ width: 400, marginTop: 30 }}
                    onChange={(e, value) => getServices(value)}
                    value={province}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                    id="choose-province"
                    options={services}
                    getOptionLabel={(option) => option?.fullname}
                    style={{ width: 400, marginTop: 30 }}
                    onChange={(e, value) => getServiceItem(value)}
                    value={service}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn dịch vụ" variant="outlined" />}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                    id="choose-province"
                    options={serviceItems}
                    getOptionLabel={(option) => `${option?.name} - ${option?.cost}`}
                    style={{ width: 400, marginTop: 30 }}
                    onChange={(e, value) => setServiceItem(value)}
                    value={serviceItem}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn loại dịch vụ" variant="outlined" />}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Button onClick={handleSubmit}>Xong</Button>
            </div>
        </Paper>
    )
}

export default function AddService(props) {

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

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
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
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
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
