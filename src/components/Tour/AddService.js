import { Backdrop, Button, Card, ClickAwayListener, Dialog, DialogActions, DialogTitle, Fade, Grid, IconButton, InputBase, MenuItem, MenuList, Modal, Paper, Popper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import * as tourAction from '../../redux/actions/createTourAction';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { formStyles } from '../../style';
import { Link } from 'react-router-dom';
import { AddCircle, MoreVert } from '@material-ui/icons';
import { ReviewArea } from '../Service/ServiceItem';


const filter = createFilterOptions();

function ServiceItemAddForm(props) {

    const dispatch = useDispatch();

    const { location } = useSelector(state => state);

    const { currentProvince, setCurrentProvince, type } = props;
    const [services, setServices] = useState([]);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(location.loadingServices);

    useEffect(() => {
        setLoading(true);
        if (currentProvince) {
            // console.log(location.services);
            setServices(location.services.filter(item => item.province._id === currentProvince._id))
        }
        setLoading(false);
    }, [currentProvince, location.services])

    const setProvince = (province) => {
        setCurrentProvince(province);
    }



    const handleSubmit = () => {

        if (service) {

            let sv = service?._id ? {
                service: service,
                cost: 0,
                description: ''
            } : {
                serviceName: service.name,
                cost: 0,
                description: ''
            }
            dispatch(tourAction.addService({
                service: sv,
                type: type,
            }))
        }
        // console.log(service);
    }

    const classes = formStyles();

    return (
        <div>
            <div className={classes.center}>
                <Typography variant='h6'>Thêm dịch vụ</Typography>
            </div>
            <div className={classes.center}>
                <Autocomplete
                    id="choose-province"
                    freeSolo
                    options={location.provinces}
                    loading={location.loading}
                    getOptionLabel={(option) => option?.fullname}
                    className={classes.autocomplete}
                    onChange={(e, value) => setProvince(value)}
                    value={currentProvince}
                    renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                />
            </div>
            <div className={classes.center}>
                <Autocomplete
                    id="choose-province"
                    freeSolo
                    options={services}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                title: `Thêm ${params.inputValue}`
                            })
                        }
                        return filtered;
                    }}
                    loading={loading}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue
                        }

                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(option) => option.name}
                    className={classes.autocomplete}
                    onChange={(e, value) => {
                        if (typeof value === 'string') {
                            setService({
                                name: value,
                                description: '',
                                images: ['https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg'],
                            })
                        }
                        else if (value && value.inputValue) {
                            setService({
                                name: value.inputValue,
                                description: '',
                                images: ['https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg'],
                            })
                        }
                        else {
                            setService(value);
                        }
                    }}
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
            <div style={{ marginTop: 10 }} className={classes.center}>
                <Button
                    className={classes.button}
                    type="submit"
                    onClick={handleSubmit}
                    startIcon={(<AddCircle />)}
                    disabled={!service}
                >
                    Thêm
                </Button>
            </div>
        </div>
    )
}

function DetailService(props) {
    const { service, isEdit, type, indexService, isOwn } = props;

    const [cost, setCost] = useState(service.cost);
    const [description, setDescription] = useState(service.description);

    const dispatch = useDispatch();

    const handleUpdate = () => {
        // console.log(cost);
        dispatch(tourAction.updateService({ cost: parseInt(cost), description: description, type: type, indexService: indexService }))
    }

    return (
        <Paper style={{ width: 800 }}>
            <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ padding: 30 }}>
                        <img src={service.service ? service.service.images[0] : 'https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg'} alt="Service" style={{ width: '100%', height: 200 }} />
                    </div>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    {service.serviceName ?
                        <Typography>{service.serviceName}</Typography> :
                        <Typography component={Link} to={`/u/${service.service.cooperator}`}>{service.service.name}</Typography>

                    }
                    {
                        isEdit ?
                            <div>

                                <InputBase
                                    placeholder="Thông tin"
                                    title="Thông tin"
                                    variant="outlined"
                                    name="description"
                                    id="description"
                                    style={{ width: "100%" }}
                                    // className={classes.hashtag}
                                    multiline
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <TextField
                                    label="Chi phí (nghìn VND)"
                                    variant="outlined"
                                    name="cost"
                                    id="cost"
                                    style={{ width: "100%" }}
                                    type={"number"}
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                                <Button onClick={handleUpdate}>
                                    Cập nhật
                                </Button>
                            </div> :
                            <div>

                                <Typography>{cost}</Typography>
                                <Typography>{description}</Typography>
                            </div>
                    }
                    {!isEdit && isOwn && service?.service &&
                        <ReviewArea id={service.service._id} />
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export function ServiceCard(props) {
    const { service, index, isEdit, review, isOwn, type } = props;

    const classes = formStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const handleShowDetail = () => {
        setShowDetail(true);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

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



    const refDetail = React.createRef();

    const DetailRef = React.forwardRef((props, ref) =>
        <DetailService innerRef={ref} {...props} />
    )

    return (
        <Card className={classes.serviceCard}>

            <div style={{ display: 'flex' }}>
                <div>
                    <img src={service.service ? service.service.images[0] : 'https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg'} alt="Service" style={{ width: 200, height: 200 }} />
                </div>
                <div className={classes.serviceInfo}>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography onClick={handleShowDetail}>{service.serviceName ? service.serviceName : service.service.name}</Typography>
                            <Typography>Chi phí: {new Intl.NumberFormat().format(service.cost * 1000)} VND</Typography>
                        </div>
                        <div>
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
                        </div>
                    </div>


                </div>
            </div>
            <Modal
                aria-labelledby="modal-detail-service"
                aria-describedby="modal-detail-service-description"
                open={showDetail}
                className={classes.modal}
                onClose={handleCloseDetail}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showDetail}>
                    <DetailRef
                        ref={refDetail}
                        handleClose={handleCloseDetail}
                        service={service}
                        isEdit={isEdit}
                        isOwn={isOwn}
                        review={review}
                        indexService={index}
                        type={type}
                    />
                </Fade>
            </Modal>
        </Card>

    )
}

export default function AddService(props) {

    const classes = formStyles();


    const ref = React.createRef();

    const ServiceItemAddRef = React.forwardRef((props, ref) =>
        <ServiceItemAddForm innerRef={ref} {...props} />
    )

    return (
        <Paper className={classes.paperContainer}>
            <div style={{ marginTop: 20 }} className={classes.center}>
                <ServiceItemAddRef
                    ref={ref}
                    {...props}
                />
            </div>
        </Paper>
    )
}
