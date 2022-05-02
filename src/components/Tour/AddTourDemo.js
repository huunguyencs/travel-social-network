import { Button, Grid, Typography, Paper, IconButton, TextField, InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tourdetailStyles } from "../../style";
// import AddLocationForm from "../Forms/AddLocation";
// import Location from './Location';
import * as tourAction from '../../redux/actions/createTourAction';
import { useHistory } from "react-router-dom";
import UpdateDateForm from "../Forms/UpdateDate";
import UpdateTourInfo from "../Forms/UpdateInfoCreateTour";
import { convertDateToStr } from "../../utils/date";
import { saveTour, updateTour } from "../../redux/callApi/tourCall";
// import AddLocation from "./AddLocation";
import { getLocations, getProvinces } from '../../redux/callApi/locationCall';
import AddService, { ServiceCard } from "./AddService";
import { Close } from "@material-ui/icons";
// import ChangeImageTour from "./ChangeImageTour";
import { error } from "../../redux/actions/alertAction";
import * as alertAction from '../../redux/actions/alertAction'
import SpeedDialButton from '../SpeedDialBtn';



function EditDetailDate(props) {
    const { tourDate, date, handleClose } = props;

    const [text, setText] = useState(tourDate.description || '');
    const [cost, setCost] = useState(tourDate.cost || 0);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const dispatch = useDispatch();


    const handleSubmit = (e) => {

        dispatch(tourAction.updateDesciptionDate({ indexDate: date, description: text, cost: parseInt(cost) }))
        dispatch(alertAction.success({ message: 'Cập nhật thành công!' }))
    }

    const classes = tourdetailStyles();

    return (
        <Paper className={classes.paperDetailDate}>
            <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ overflowY: 'auto', height: '70vh' }}>
                        <Typography variant='h5' style={{ textAlign: 'center', marginTop: 10 }}>Chi tiết lịch trình ngày {convertDateToStr(tourDate.date)}</Typography>
                        <div style={{ margin: 20 }}>
                            <TextField
                                label="Ghi chú"
                                variant='outlined'
                                name='description'
                                onChange={handleChange}
                                value={text}
                                // className={classes.fullField}
                                style={{
                                    width: '100%',
                                }}
                                multiline
                                rows={4}
                            />
                            <TextField
                                label="Chi phí"
                                title="Chi phí"
                                variant="outlined"
                                name="cost"
                                id="cost"
                                type="number"
                                className={classes.fullField}
                                // className={classes.hashtag}
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">.000 VND</InputAdornment>,
                                }}
                            />
                            {
                                <div style={{ display: 'flex', justifyContent: 'right', marginTop: 20 }}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        Cập nhật
                                    </Button>
                                </div>
                            }
                        </div>
                        <AddService type='date' indexDate={date} />
                    </div>

                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ overflowY: 'auto', height: '70vh' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div></div>
                            <Typography variant='h5' style={{ textAlign: 'center', marginTop: 10 }}>Danh sách dịch vụ</Typography>
                            <div>
                                <IconButton size='small' onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </div>
                        </div>

                        {
                            tourDate.services.map(((item, index) =>
                                <ServiceCard isOwn={false} type='date' key={index} service={item} index={index} isEdit={true} indexDate={date} />
                            ))
                        }
                    </div>
                </Grid>
            </Grid>

        </Paper>
    )
}

export default function AddTourDemo(props) {

    const { isUpdate } = props;

    const history = useHistory();
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const dispatch = useDispatch();
    const { createTour, location, auth, socket } = useSelector(state => state);
    const [currentProvince, setCurrentProvince] = useState(null);
    const [showDetailDate, setShowDetailDate] = useState(false);

    // const [showAddLoc, setShowAddLoc] = useState(false);
    // const handleShowAddLoc = () => {
    //     setShowAddLoc(true);
    // }
    // const handleCloseAddLoc = () => {
    //     setShowAddLoc(false);
    // }

    // const [showAddService, setShowAddService] = useState(false);
    // const handleShowAddService = () => {
    //     setShowAddService(true);
    // }
    // const handleCloseAddService = () => {
    //     setShowAddService(false);
    // }

    const handleShowDetailDate = () => {
        setShowDetailDate(true);
    }

    const handleCloseDetailDate = () => {
        setShowDetailDate(false);
    }

    const [idx, setIdx] = useState(0);
    // const [addLoc, setAddLoc] = useState(false);
    const [showUpdateDate, setShowUpdateDate] = useState(false);
    const [showDeleteDate, setShowDeteleDate] = useState(-1);
    const [showChangeInfo, setShowChangeInfo] = useState(false);
    const [showReset, setShowReset] = useState(false);

    const handleShowReset = () => {
        setShowReset(true);
    }

    const handleCloseReset = () => {
        setShowReset(false);
    }


    const handleAddDay = () => {
        dispatch(tourAction.addDate());
    }

    const handleSave = async () => {
        if (createTour.tour.length === 0) return;
        setState({
            loading: true,
            error: false
        })
        if (!createTour.image || createTour.image === "") {
            setState({
                loading: false,
                error: true
            })
            return;
        }


        dispatch(saveTour({
            name: createTour.name,
            content: createTour.content,
            hashtags: createTour.hashtags,
            tour: createTour.tour,
            cost: createTour.cost
        }, createTour.image, auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            })
            history.push("/tour")
        }, () => {
            setState({
                loading: false,
                error: false
            })
            dispatch(error({ error: "Có lỗi xảy ra" }))
        }))
    }

    const handleUpdate = async () => {
        if (createTour.tour.length === 0) return;
        setState({
            loading: true,
            error: false
        })

        if (!createTour.image || createTour.image === "") {
            setState({
                loading: false,
                error: true
            })
            return;
        }

        dispatch(updateTour(createTour._id, {
            name: createTour.name,
            content: createTour.content,
            hashtags: createTour.hashtags,
            tour: createTour.tour,
            cost: createTour.cost,
        }, createTour.image, auth.token, () => {
            // console.log("done");
            setState({
                loading: false,
                error: false
            })
            history.push("/tour")
        }, () => {
            setState({
                loading: false,
                error: false
            })
            dispatch(error({ error: "Có lỗi xảy ra" }))
        }))
    }

    const handleDeleteDate = (index) => {
        if (index < 0) return;
        dispatch(tourAction.deleteDate({ indexDate: index }));
        if (idx === index) {
            if (index === 0) {
                setIdx(0)
            }
            else setIdx(index - 1);
        }
        handleCloseDelete();
    }

    const handleShowUpdate = () => {
        setShowUpdateDate(true);
    }

    const handleCloseUpdate = () => {
        setShowUpdateDate(false);
    }

    const handleShowDelete = (index) => {
        setShowDeteleDate(index);
    }

    const handleCloseDelete = () => {
        setShowDeteleDate(-1);
    }

    const handleCloseUpdateInfo = () => {
        setShowChangeInfo(false)
    }

    useEffect(() => {
        if (location.provinces?.length === 0) {
            dispatch(getProvinces());
        }
    }, [dispatch, location.provinces])


    useEffect(() => {
        if (location.locations?.length === 0) {
            dispatch(getLocations());
        }
    }, [dispatch, location.locations])

    // useEffect(() => {
    //     if (location.services?.length === 0) {
    //         dispatch(getServices());
    //     }
    // }, [dispatch, location.services])

    const handleShowUpdateInfo = () => {
        setShowChangeInfo(true);
    }

    const refInfo = React.createRef();
    const refUdDate = React.createRef();
    // const refAddLoc = React.createRef();
    const refEditDetailDate = React.createRef();

    const UpdateTourInfoRef = React.forwardRef((props, ref) =>
        <UpdateTourInfo {...props} innerRef={ref} />
    )

    const UpdateDateRef = React.forwardRef((props, ref) =>
        <UpdateDateForm {...props} innerRef={ref} />
    )

    const EditDetailDateRef = React.forwardRef((props, ref) =>
        <EditDetailDate {...props} innerRef={ref} />
    )

    // const AddLocationRef = React.forwardRef((props, ref) =>
    //     <AddLocationForm {...props} innerRef={ref} />
    // )

    const handleReset = () => {
        dispatch(tourAction.createTour({ name: createTour.name, date: createTour.tour[0].date }));
        handleCloseReset();
    }


    const classes = tourdetailStyles();

    return (
        <>
            {
                (!isUpdate || (isUpdate && createTour.tour && createTour.tour[0])) &&
                    <Grid container className={classes.container}>
                        <SpeedDialButton />
                        <Grid container className={classes.tourDetailContainer}>
                            <Grid item lg={8} md={8} sm={12} className={classes.tourInfoLeft}>
                                <div style={{height: 300, backgroundColor: "#57606F", margin: 20}}>

                                </div>
                                <div style={{height: 200, backgroundColor: "#57606F", margin: 20}}>
                                    
                                </div>
                                <div style={{height: 600, backgroundColor: "#57606F", margin: 20}}>
                                    
                                </div>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} className={classes.tourDatesRight} >
                                <div >
                                    <div style={{height: 100, backgroundColor: "#57606F", margin: 20}}>
                                    
                                    </div>
                                    <div style={{height: 100, backgroundColor: "#57606F", margin: 20}}>
                                        
                                    </div>
                                    <div style={{height: 500, backgroundColor: "#57606F", margin: 20}}>
                                        
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}