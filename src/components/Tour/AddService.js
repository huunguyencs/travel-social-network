import { Backdrop, Button, Card, ClickAwayListener, Collapse, Dialog, DialogActions, DialogTitle, Fade, IconButton, MenuItem, MenuList, Modal, Paper, Popper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../utils/fetchData';
import * as tourAction from '../../redux/actions/createTourAction';
import { Autocomplete } from '@material-ui/lab';
import { formStyles } from '../../style';
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { ReviewArea } from '../Service/ServiceItem';

function ServiceItemAddForm(props) {

    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);

    const { location } = useSelector(state => state);

    const { provinceCache, setProvinceCache, serviceCache, setServiceCache, handleClose } = props;

    const [province, setProvince] = useState(provinceCache);
    const [service, setService] = useState(null);
    const [services, setServices] = useState(serviceCache);
    const [cost, setCost] = useState(0);
    const [loading, setLoading] = useState(false);

    const getServicesInit = async (province, setServices, setServiceCache) => {
        setLoading(true);
        await customAxios().get(`/province/service/${province._id}`).then(res => {
            setServices(res.data.services);
            setServiceCache(res.data.services);
            setLoading(false);
        }).catch(err => setLoading(false))
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
                setLoading(true);
                await customAxios().get(`/province/service/${value._id}`).then(res => {
                    setServices(res.data.services);
                    setServiceCache(res.data.services);
                    setLoading(false)
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
                    cost: parseInt(cost),
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
                    loading={location.loading}
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
                    loading={loading}
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
    const { service, index, isEdit, review } = props;

    const classes = formStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const dispatch = useDispatch();

    const handleShowMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleShowDelete = () => {
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    }

    const handleDelete = () => {
        dispatch(tourAction.deleteService({ index: index }))
    }

    const handleShowReview = () => {
        setShowReview(state => !state)
    }

    return (
        <Card className={classes.serviceCard}>
            <>
                {service.service &&
                    <>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <img src={service.service.images[0]} alt="Loading..." className={classes.imageService} />
                            </div>
                            <div className={classes.serviceInfo}>
                                {isEdit &&
                                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleShowMenu}
                                            controls={anchorEl ? "service-item-menu" : undefined}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                        <Popper
                                            open={Boolean(anchorEl)}
                                            anchorEl={anchorEl}
                                            onClose={handleCloseMenu}
                                            disablePortal
                                        >
                                            {/* <Grow
                                                style={{ transformOrigin: "center bottom" }}
                                            > */}
                                            <ClickAwayListener onClickAway={handleCloseMenu}>
                                                <Paper>
                                                    <MenuList>
                                                        <MenuItem onClick={handleShowDelete}>
                                                            Xóa
                                                        </MenuItem>
                                                        <Dialog
                                                            open={showDelete}
                                                            onClose={handleCloseDelete}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseDelete}>
                                                                    Hủy
                                                                </Button>
                                                                <Button onClick={handleDelete} className={classes.delete}>
                                                                    Xóa
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </MenuList>
                                                </Paper>
                                            </ClickAwayListener>
                                            {/* </Grow> */}
                                        </Popper>
                                    </div>
                                }

                                <Typography variant='h6' component={Link} to={`/u/${service.service.cooperator}`}>{service.service.name.length > 30 ? service.service.name.slice(0, 30) : service.service.name}</Typography>
                                <Typography>Chi phí: {new Intl.NumberFormat().format(service.cost * 1000)} VND</Typography>
                                {review && (
                                    <Button onClick={handleShowReview}>Đánh giá</Button>
                                )}
                            </div>
                        </div>
                        <div>
                            <Collapse in={showReview}>
                                <ReviewArea id={service.service._id} />
                            </Collapse>
                        </div>
                    </>
                }
            </>
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

    const ref = React.createRef();

    const ServiceItemAddRef = React.forwardRef((props, ref) =>
        <ServiceItemAddForm innerRef={ref} {...props} />
    )

    return (
        <>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Chọn dịch vụ
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <>
                    {
                        services && services.map((item, index) => (
                            <ServiceCard service={item} key={index} index={index} isEdit={true} />
                        ))
                    }
                </>
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
                        <ServiceItemAddRef
                            ref={ref}
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
