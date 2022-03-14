import { Button, Container, Grid, Typography, CircularProgress, Tabs, Tab } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'

import { tourdetailStyles } from "../../style";
import Location from './Location';
import { convertDateToStr, convertDateToStrShort } from "../../utils/date";
// import { useSelector } from "react-redux";
import MapCard from "../Card/MapCard";
import { Link, useHistory } from "react-router-dom";
import { ServiceCard } from "./AddService";
import { FileCopy, Update } from "@material-ui/icons";
import { loadTour } from "../../redux/actions/createTourAction";
import { useDispatch } from "react-redux";
import ImageModal from "../Modal/Image";

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


export default function TourDetail(props) {

    const classes = tourdetailStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const [idx, setIdx] = useState(0);
    const [tab, setTab] = useState(0);
    const [tabService, setTabService] = useState(0);
    const [position, setPosition] = useState(null);
    const [locations, setLocations] = useState([]);
    const [showImage, setShowImage] = useState(false);

    const handleShowImage = () => {
        setShowImage(true);
    }

    const handleCloseImage = () => {
        setShowImage(false);
    }

    const handleChangeTab = (e, value) => {
        setTab(value);
    }

    const handleChangeTabService = (e, value) => {
        setTabService(value);
    }


    // const [showService, setShowService] = useState(false);
    // const handleShowService = () => {
    //     setShowService(true);
    // }

    // const handleCloseService = () => {
    //     setShowService(false);
    // }

    const { tour, isOwn, setTour } = props;

    const createReview = (id, index_loc, tourdate_id) => {
        setTour(state => ({
            ...state,
            tour: state.tour.map(item => item._id === tourdate_id ? {
                ...item,
                locations: item.locations.map((location, index) => index === index_loc ? {
                    ...location,
                    postId: id
                } : location)
            } : item)
        }))
    }


    useEffect(() => {
        if (tour && tour.tour[idx].locations.length > 0) {
            setPosition(tour.tour[idx].locations[0].location.position)
        }
    }, [tour, idx])

    useEffect(() => {
        var locs = tour.tour[idx].locations.map(item => item.location);
        setLocations(locs);
    }, [tour, idx])

    const handleCopyAndEdit = () => {
        dispatch(loadTour({ tour: tour }));
        history.push('/createtour');
    }


    return (
        <>
            {
                tour ?
                    <div>
                        <div className={classes.coverTitle}>
                            <Typography variant="h3" className={classes.title}>{tour.name}</Typography>
                        </div>
                        <div className={classes.info}>
                            <Container>
                                <Grid container>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <div className={classes.itemInfo}>
                                            <Typography variant="body1" className={classes.content}>
                                                {tour.content}
                                            </Typography>
                                        </div>
                                        <div className={classes.hashtagWrap}>
                                            {tour.hashtags.map((hashtag, index) => (
                                                <Typography className={classes.hashtag} key={index}>#{hashtag}</Typography>
                                            ))}
                                        </div>
                                        <div className={classes.itemInfo}>
                                            <Typography variant="body1" className={classes.content}>
                                                Tổng chi phí: {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img src={tour.image} className={classes.image} width={350} height={300} alt="Can not load" onClick={handleShowImage} />
                                            <ImageModal
                                                open={showImage}
                                                handleClose={handleCloseImage}
                                                img={tour.image}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        {
                                            isOwn ?
                                                <div className={classes.center}>
                                                    <Button startIcon={<Update />} className={classes.editButton} component={Link} to={`?edit=true`}>Chỉnh sửa hành trình</Button>
                                                </div> :
                                                <div className={classes.center}>
                                                    <Button
                                                        startIcon={<FileCopy />}
                                                        onClick={handleCopyAndEdit}
                                                        className={classes.editButton}
                                                    >
                                                        Sao chép và chỉnh sửa
                                                    </Button>
                                                </div>
                                        }
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>

                        <div className={classes.tabsMenu}>
                            <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs tour">
                                <Tab label="Địa điểm" {...a11yProps(0)} />
                                <Tab label="Dịch vụ" {...a11yProps(1)} />
                            </Tabs>
                        </div>

                        <TabPanel value={tab} index={0}>
                            <Container className={classes.container}>
                                <Grid container >
                                    <Grid item md={2} sm={12} xs={12}>
                                        <Container className={classes.timeline}>
                                            <Timeline align="right">
                                                {tour.tour.map((item, index) => (
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
                                                {tour.tour.map((item, index) => (
                                                    <Button key={index} className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                        {convertDateToStrShort(new Date(item.date))}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12} className={classes.feedTour}>
                                        {
                                            tour.tour[idx].locations.map((item, index) => (
                                                <Location
                                                    location={item}
                                                    index={index}
                                                    edit={false}
                                                    key={item._id}
                                                    isOwn={isOwn}
                                                    isSave={true}
                                                    tourDateId={tour.tour[idx]._id}
                                                    indexDate={idx}
                                                    indexLocation={index}
                                                    isEdit={false}
                                                    addReview={createReview}
                                                />
                                            ))
                                        }
                                    </Grid>
                                    <Grid item md={6} className={classes.addContainerLarge}>
                                        <Container style={{ margin: 30 }}>
                                            {position ? <MapCard position={position} zoom={12} locations={locations} /> : null}
                                        </Container>
                                    </Grid>
                                </Grid>
                            </Container>

                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Container style={{ marginTop: 20 }}>
                                <Grid container>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <div className={classes.center}>
                                            <Tabs value={tabService} onChange={handleChangeTabService} aria-label="tabs tour service" >
                                                <Tab label="Di chuyển" {...a11yProps(0)} />
                                                <Tab label="Ăn uống" {...a11yProps(1)} />
                                                <Tab label="Khách sạn" {...a11yProps(2)} />
                                                <Tab label="Khác" {...a11yProps(3)} />
                                            </Tabs>
                                        </div>
                                        <TabPanel value={tabService} index={0}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    tour.services[0].map((item, index) => (
                                                        <ServiceCard isOwn={isOwn} type={0} key={index} service={item} index={index} isEdit={false} />
                                                    ))
                                                }
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={tabService} index={1}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    tour.services[1].map((item, index) => (
                                                        <ServiceCard isOwn={isOwn} type={1} key={index} service={item} index={index} isEdit={false} />
                                                    ))
                                                }
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={tabService} index={2}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    tour.services[2].map((item, index) => (
                                                        <ServiceCard isOwn={isOwn} type={2} key={index} service={item} index={index} isEdit={false} />
                                                    ))
                                                }
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={tabService} index={3}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    tour.services[3].map((item, index) => (
                                                        <ServiceCard isOwn={isOwn} type={3} key={index} service={item} index={index} isEdit={false} />
                                                    ))
                                                }
                                            </div>
                                        </TabPanel>
                                    </Grid>
                                    <Grid item md={6}>

                                    </Grid>
                                </Grid>
                            </Container>
                        </TabPanel>



                    </div >
                    :
                    <CircularProgress color={"inherit"} />
            }
        </>
    )
}