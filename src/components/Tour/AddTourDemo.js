<<<<<<< HEAD
import { Button, Grid, Typography, Paper, IconButton, TextField, InputAdornment } from "@material-ui/core";
=======
import { Button, Grid, Modal, Typography, Backdrop, Box, Fade, Dialog, DialogActions, Step, DialogTitle, CircularProgress, Paper, IconButton, TextField, InputAdornment, Stepper, StepContent, StepLabel, Tabs, Tab } from "@material-ui/core";
>>>>>>> 65451f825753fe0d42cd921b6e3d3297a49c48c3
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
<<<<<<< HEAD
import { Close } from "@material-ui/icons";
// import ChangeImageTour from "./ChangeImageTour";
=======
import { AddCircle, Close, Save, Update, LocationOnOutlined } from "@material-ui/icons";
import ChangeImageTour from "./ChangeImageTour";
>>>>>>> 65451f825753fe0d42cd921b6e3d3297a49c48c3
import { error } from "../../redux/actions/alertAction";
import * as alertAction from '../../redux/actions/alertAction'
import SpeedDialButton from '../SpeedDialBtn';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';


function EditDetailDate(props) {
    const { tourDate, date } = props;

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
                    <div style={{padding: 5}}>
                        <div >
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
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="contained" onClick={handleSubmit} className={classes.button}>
                                        Cập nhật
                                    </Button>
                                </div>
                            }
                        </div>
                        <AddService type='date' indexDate={date} />
                    </div>

                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6' style={{ textAlign: 'center', marginTop: 10 }}>Danh sách dịch vụ</Typography>
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

const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: 'white',
      zIndex: 1,
      color: '#63B191',
      width: 35,
      height: 35,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #63B191'
    },
    active: {
      backgroundColor: '#63B191',
      color: 'white',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
    },
    completed: {
      backgroundColor: 'white',
      color: '#63B191'
    }
  });
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        <LocationOnOutlined style={{ width: 25 }} />
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
  };
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`
    };
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

    const [idx, setIdx] = useState(0);
    const [showUpdateDate, setShowUpdateDate] = useState(false);
    const [showDeleteDate, setShowDeteleDate] = useState(-1);
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



    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {
                (!isUpdate || (isUpdate && createTour.tour && createTour.tour[0])) &&
                    <Grid container className={classes.container}>
                        <SpeedDialButton />
                        <Grid container className={classes.tourDetailContainer}>
                            <Grid item lg={8} md={8} sm={12} xs={12} >
                                <div className={classes.tourInfoGeneral}>
                                    <Grid container >
                                        <Grid item md={8} sm={7} xs={12}>
                                            <UpdateTourInfoRef ref={refInfo} name={createTour.name} content={createTour.content} hashtags={createTour.hashtags} image={createTour.image}  cost={createTour.cost} />
                                        </Grid>
                                        <Grid item md={4} sm={5} xs={12}>
                                            <div style={{ paddingRight: 40 }}>
                                                <ChangeImageTour />
                                            </div>
                                            {state.error && <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>Bạn cần thêm ảnh</span>}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.createTourDates}>
                                    <Stepper  activeStep={idx}  orientation="vertical" className={classes.datesWrapper}>
                                    {createTour.tour.map((item, index) => (
                                        <Step key={index}  onClick={() => setIdx(index)} style={{cursor: "pointer"}}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon}>
                                                Chi tiết lịch trình ngày {convertDateToStr(item.date)}
                                                <IconButton size="small" onClick={() => handleShowDelete(index)} style={{marginLeft: 20}}>
                                                    <Close />
                                                </IconButton>
                                                <Button onClick={handleShowUpdate} className={classes.addDay} startIcon={(<Update />)}>
                                                    Thay đổi ngày
                                                </Button>
                                                <Button className={classes.addDay} onClick={handleAddDay} startIcon={(<AddCircle />)}>
                                                    Thêm ngày
                                                </Button>
                                            </StepLabel>
                                            <StepContent>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    indicatorColor="primary"
                                                    textColor="primary"
                                                    variant="scrollable"
                                                    scrollButtons="auto"
                                                    aria-label="scrollable auto tabs example"
                                                >
                                                    <Tab label="Tổng quan ngày" {...a11yProps(0)} />
                                                    <Tab label="Các địa điểm" {...a11yProps(1)} />
                                                </Tabs>
                                                <TabPanel value={value} index={0} className={classes.tabPanel}>
                                                    <EditDetailDateRef ref={refEditDetailDate} date={idx} tourDate={createTour.tour[idx]} />
                                                </TabPanel>
                                                <TabPanel value={value} index={1} className={classes.tabPanel}>
                                                {
                                                    createTour.tour[idx].locations.map((item, index) => (
                                                        <Location
                                                            location={item}
                                                            indexDate={idx}
                                                            indexLocation={index}
                                                            edit={true}
                                                            key={index}
                                                            isOwn={true}
                                                            isSave={false}
                                                            isEdit={true}
                                                        />
                                                    ))
                                                }
                                                </TabPanel>
                                            </StepContent>
                                        </Step>
                                        ))}
                                    </Stepper>
                                </div> 
                                <div className={classes.center}>
                                    <Dialog
                                        open={showDeleteDate !== -1}
                                        onClose={handleCloseDelete}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa ngày?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleCloseDelete}>
                                                Hủy
                                            </Button>
                                            <Button onClick={() => handleDeleteDate(showDeleteDate)} className={classes.delete}>
                                                Xóa
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={showUpdateDate}
                                    className={classes.modal}
                                    onClose={handleCloseUpdate}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={showUpdateDate}>
                                        <UpdateDateRef ref={refUdDate} handleClose={handleCloseUpdate} indexDate={idx} currentDate={createTour.tour[idx].date} />
                                    </Fade>
                                </Modal>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <div className={classes.tourRight}>
                                    <div className={classes.tourButtons}>
                                        <Button onClick={handleShowReset} className={classes.reviewBtn}>
                                            Reset
                                        </Button>
                                        <div className={classes.center}>
                                            <Dialog
                                                open={showReset}
                                                onClose={handleCloseDelete}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn reset tour?"}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={handleCloseReset}>
                                                        Hủy
                                                    </Button>
                                                    <Button onClick={handleReset} className={classes.delete}>
                                                        Reset
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                        <Button onClick={isUpdate ? handleUpdate : handleSave} startIcon={(<Save />)} className={classes.reviewBtn}>
                                            {state.loading ?
                                                <CircularProgress size="25px" color="inherit" />
                                                : "Lưu hành trình"
                                            }
                                        </Button>
                                    </div>
                                    <div className={classes.tourChoose}>
                                        <AddLocation
                                            indexDate={idx}
                                            currentProvince={currentProvince}
                                            setCurrentProvince={setCurrentProvince}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}