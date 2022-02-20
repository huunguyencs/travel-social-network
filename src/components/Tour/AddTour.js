import { Button, Container, Grid, Modal, Typography, Backdrop, Fade, Dialog, DialogActions, DialogTitle, CircularProgress, Tab, Tabs, Paper, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { useDispatch, useSelector } from "react-redux";

import { tourdetailStyles } from "../../style";
import AddLocationForm from "../forms/addLocation";
import Location from './Location';
import * as tourAction from '../../redux/actions/createTourAction';
import { useHistory } from "react-router-dom";
import UpdateDateForm from "../forms/updateDate";
import UpdateTourInfo from "../forms/updateInfoCreateTour";
import { convertDateToStr, convertDateToStrShort } from "../../utils/date";
import { saveTour, updateTour } from "../../redux/callApi/tourCall";
import AddLocation from "./AddLocation";
import { getProvinces } from '../../redux/callApi/locationCall';
import AddService from "./AddService";
import { Close } from "@material-ui/icons";


function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
}

function extractService(services) {
    return services.map((item) => ({
        service: item.service._id,
        cost: item.cost
    }))
}

export default function AddTour(props) {

    const { isUpdate } = props;

    const history = useHistory();
    const [state, setState] = useState({
        loading: false,
        error: false
    })

    const dispatch = useDispatch();
    const { createTour, location, auth, socket } = useSelector(state => state);
    const [tab, setTab] = useState(0)
    const [currentProvince, setCurrentProvince] = useState(null);
    const [loc, setLoc] = useState(null);
    const [locations, setLocations] = useState([]);

    const [showAddLoc, setShowAddLoc] = useState(false);
    const handleShowAddLoc = () => {
        setShowAddLoc(true);
    }
    const handleCloseAddLoc = () => {
        setShowAddLoc(false);
    }

    const [showAddService, setShowAddService] = useState(false);
    const handleShowAddService = () => {
        setShowAddService(true);
    }
    const handleCloseAddService = () => {
        setShowAddService(false);
    }

    const [idx, setIdx] = useState(0);
    // const [addLoc, setAddLoc] = useState(false);
    const [showUpdateDate, setShowUpdateDate] = useState(false);
    const [showDeleteDate, setShowDeteleDate] = useState(false);
    const [showChangeInfo, setShowChangeInfo] = useState(false);


    const handleAddDay = () => {
        dispatch(tourAction.addDate());
    }

    const handleSave = async () => {
        if (createTour.tour.length === 0) return;
        setState({
            loading: true,
            error: false
        })

        dispatch(saveTour({
            name: createTour.name,
            content: createTour.content,
            hashtags: createTour.hashtags,
            tour: createTour.tour,
            cost: createTour.cost,
            services: extractService(createTour.services)
        }, createTour.image, auth.token, socket, () => {
            setState({
                loading: false,
                error: false
            })
            history.push("/tour")
        }, () => {
            setState({
                loading: false,
                error: true
            })
        }))
    }

    const handleUpdate = async () => {
        if (createTour.tour.length === 0) return;
        setState({
            loading: true,
            error: false
        })

        dispatch(updateTour(createTour._id, {
            name: createTour.name,
            content: createTour.content,
            hashtags: createTour.hashtags,
            tour: createTour.tour,
            cost: createTour.cost,
            services: extractService(createTour.services)
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
                error: true
            })
        }))
    }

    const handleDeleteDate = () => {
        dispatch(tourAction.deleteDate({ indexDate: idx }));
        setIdx(0);
        handleCloseDelete();
    }

    const handleShowUpdate = () => {
        setShowUpdateDate(true);
    }

    const handleCloseUpdate = () => {
        setShowUpdateDate(false);
    }

    const handleShowDelete = () => {
        setShowDeteleDate(true);
    }

    const handleCloseDelete = () => {
        setShowDeteleDate(false);
    }

    const handleCloseUpdateInfo = () => {
        setShowChangeInfo(false)
    }

    const handleChangeTab = (e, value) => {
        setTab(value);
    }

    useEffect(() => {
        if (location.provinces?.length === 0) {
            dispatch(getProvinces());
        }
    }, [dispatch, location.provinces])

    const handleShowUpdateInfo = () => {
        setShowChangeInfo(true);
    }


    const classes = tourdetailStyles();

    return (
        <>
            {
                (!isUpdate || (isUpdate && createTour.tour && createTour.tour[0])) &&
                <div>
                    <div className={classes.coverTitle}>
                        <Typography variant="h3" className={classes.title}>{createTour.name}</Typography>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.itemInfo}>
                            <Typography variant="body1" className={classes.content}>
                                {createTour.content}
                            </Typography>
                        </div>
                        <div className={classes.hashtagWrap}>
                            {createTour.hashtags.map((hashtag, index) => (
                                <Typography className={classes.hashtag} key={index}>{hashtag}</Typography>
                            ))}
                        </div>
                        <div className={classes.itemInfo}>
                            <Typography variant="body1" className={classes.content}>
                                Chi phí: {new Intl.NumberFormat().format(createTour.cost * 1000)} VND
                            </Typography>
                        </div>
                        <div className={classes.itemInfo}>
                            <Button onClick={handleShowUpdateInfo}>Chỉnh sửa thông tin</Button>
                        </div>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={showChangeInfo}
                            onClose={handleCloseUpdateInfo}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={showChangeInfo}>
                                <UpdateTourInfo name={createTour.name} content={createTour.content} hashtags={createTour.hashtags} image={createTour.image} handleClose={handleCloseUpdateInfo} cost={createTour.cost} />
                            </Fade>
                        </Modal>
                    </div>

                    <Grid container className={classes.container}>
                        <Grid item md={2} sm={12} xs={12}>
                            <Container className={classes.timeline}>
                                <Timeline align="right">
                                    {createTour.tour.map((item, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineSeparator>
                                                <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                    {convertDateToStr(item.date)}
                                                </Button>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>

                            </Container>
                            <div className={classes.smallTimeline}>
                                <div className={classes.timelineWrap}>
                                    {createTour.tour.map((item, index) => (
                                        <Button key={index} className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                            {convertDateToStrShort(new Date(item.date))}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className={classes.addDayWrap}>
                                <Button className={classes.addDay} onClick={handleAddDay}>
                                    Thêm ngày
                                </Button>

                                <Button className={classes.addDay} onClick={isUpdate ? handleUpdate : handleSave}>
                                    {state.loading ?
                                        <CircularProgress size="25px" color="inherit" />
                                        : "Lưu lại"
                                    }
                                </Button>
                            </div>

                        </Grid>
                        <Grid item md={4} sm={12} xs={12} className={classes.feedTour}>
                            <div className={classes.center}>
                                <Button onClick={handleShowDelete} className={classes.editButton}>
                                    Xóa ngày
                                </Button>
                                <Dialog
                                    open={showDeleteDate}
                                    onClose={handleCloseDelete}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa?"}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleCloseDelete}>
                                            Hủy
                                        </Button>
                                        <Button onClick={handleDeleteDate} className={classes.delete}>
                                            Xóa
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Button onClick={handleShowUpdate} className={classes.editButton}>
                                    Thay đổi ngày
                                </Button>
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
                                        <UpdateDateForm handleClose={handleCloseUpdate} indexDate={idx} currentDate={createTour.tour[idx].date} />
                                    </Fade>
                                </Modal>
                            </div>
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
                            <div className={classes.addContainerSmall}>
                                <>
                                    <Button className={classes.addTour} onClick={handleShowAddLoc}>
                                        Thêm địa điểm
                                    </Button>
                                    <Modal
                                        aria-labelledby="modal-add-location"
                                        aria-describedby="modal-add-location-description"
                                        open={showAddLoc}
                                        className={classes.modal}
                                        onClose={handleCloseAddLoc}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={showAddLoc}>
                                            <AddLocationForm
                                                handleClose={handleCloseAddLoc}
                                                indexDate={idx}
                                                currentProvince={currentProvince}
                                                setCurrentProvince={setCurrentProvince}
                                                locations={locations}
                                                setLocations={setLocations}
                                            />
                                        </Fade>
                                    </Modal>
                                    <Button className={classes.addTour} onClick={handleShowAddService}>
                                        Thêm dịch vụ
                                    </Button>
                                    <Modal
                                        aria-labelledby="modal-add-service"
                                        aria-describedby="modal-add-service-description"
                                        open={showAddService}
                                        className={classes.modal}
                                        onClose={handleCloseAddService}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={showAddService}>
                                            <Paper className={classes.paperAddService}>
                                                <div className={classes.headerService}>
                                                    <IconButton onClick={handleCloseAddService} size="small">
                                                        <Close />
                                                    </IconButton>
                                                </div>
                                                <div className={classes.addServiceContent}>
                                                    <AddService />
                                                </div>
                                            </Paper>
                                        </Fade>
                                    </Modal>
                                </>
                            </div>

                        </Grid>
                        <Grid item md={6} className={classes.addContainerLarge}>
                            <Container style={{ marginLeft: 30 }}>
                                <div className={classes.addHeader}>
                                    <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs tour">
                                        <Tab label="Chọn địa điểm" {...a11yProps(0)} style={{ textTransform: "none" }} />
                                        <Tab label="Chọn dịch vụ" {...a11yProps(1)} style={{ textTransform: "none" }} />
                                    </Tabs>
                                </div>
                                <TabPanel value={tab} index={0}>
                                    <AddLocation
                                        indexDate={idx}
                                        currentProvince={currentProvince}
                                        setCurrentProvince={setCurrentProvince}
                                        loc={loc}
                                        setLoc={setLoc}
                                        locations={locations}
                                        setLocations={setLocations}
                                    />
                                </TabPanel>
                                <TabPanel value={tab} index={1}>
                                    <AddService />
                                </TabPanel>
                            </Container>
                        </Grid>
                    </Grid>
                </div >}
        </>
    )
}