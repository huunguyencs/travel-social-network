import { Button, Grid, Typography, CircularProgress, Backdrop, Paper, IconButton, Modal, Fade, Avatar } from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useEffect, useState } from "react";

import { tourdetailStyles } from "../../style";
import Location from './Location';
import { convertDateToStr } from "../../utils/date";
// import { useSelector } from "react-redux";
import MapCard from "../Map/MapCard";
import ImageModal from "../Modal/Image";
import { Close, Update } from "@material-ui/icons";
import { ServiceCard } from "./AddService";
import { Link } from "react-router-dom";
import UserList from "../Modal/UserList";
import { useDispatch, useSelector } from "react-redux";
import { joinTour, unJoinTour } from "../../redux/callApi/tourCall";

function DetailDate(props) {
    const { tourDate, date, handleClose, joined } = props;

    const classes = tourdetailStyles();

    return (
        <Paper className={classes.paperDetailDate}>
            <Grid container>
                <Grid item md={6} sm={12} xs={12}>
                    <div style={{ overflowY: 'auto', height: '70vh' }}>
                        <Typography variant='h5' style={{ textAlign: 'center', marginTop: 10 }}>Chi tiết lịch trình ngày {convertDateToStr(tourDate.date)}</Typography>
                        <div style={{ padding: 20 }}>
                            <Typography>
                                Mô tả: {tourDate.description}
                            </Typography>
                            <Typography>
                                Chi phí: {new Intl.NumberFormat().format(tourDate.cost * 1000)} VND
                            </Typography>
                        </div>
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
                                <ServiceCard joined={joined} type='date' key={index} service={item} index={index} isEdit={false} indexDate={date} />
                            ))
                        }
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}


export default function TourDetail(props) {

    const { tour, isOwn, setTour, joined, setJoined, joinLoc } = props;

    const classes = tourdetailStyles();

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state)

    // const history = useHistory();
    // const dispatch = useDispatch();

    const [idx, setIdx] = useState(0);
    const [position, setPosition] = useState(null);
    const [locations, setLocations] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [detailDate, setDetailDate] = useState(false);
    const [showUserJoin, setShowUserJoin] = useState(false);
    const [state, setState] = useState({
        loadingJoin: false,
        error: false
    })

    const handleShowJoin = () => {
        setShowUserJoin(true);
    }

    const handleCloseJoin = () => {
        setShowUserJoin(false)
    }

    const handleShowDetailDate = () => {
        setDetailDate(true);
    }

    const handleCloseDetailDate = () => {
        setDetailDate(false);
    }

    const handleShowImage = () => {
        setShowImage(true);
    }

    const handleCloseImage = () => {
        setShowImage(false);
    }

    const createReview = (id, index_loc, tourdate_id) => {
        setTour(state => ({
            ...state,
            tour: state.tour.map(item => item._id === tourdate_id ? {
                ...item,
                locations: item.locations.map((location, index) => index === index_loc ? {
                    ...location,
                    postId: [...location.postId, id]
                } : location)
            } : item)
        }))
    }

    const updateJoin = (joins) => {
        setTour({
            ...tour,
            joinIds: joins
        })
    }

    const updateJoinLocation = (joins, idDate, idLocation) => {
        setTour(tour => ({
            ...tour,
            tour: tour.tour.map(item => item._id === idDate ? {
                ...item,
                locations: item.locations.map(loc => loc._id === idLocation ? {
                    ...loc,
                    joinIds: joins
                } : loc)
            } : item)
        }))
    }

    const handleJoin = () => {
        setState({
            loadingJoin: true,
            error: false
        })
        setJoined(true);
        var prevJoin = tour.joinIds;
        updateJoin([...prevJoin, auth.user]);
        dispatch(joinTour(tour._id, auth.token, () => {
            setState({
                loadingJoin: false,
                error: false,
            })
        }, () => {
            setState({
                loadingJoin: false,
                error: true,
            })
            if (joined) {
                setJoined(false);
                updateJoin(prevJoin);
            }
        }))
    }

    const handleUnJoin = () => {
        setState({
            loadingJoin: true,
            error: false,
        })
        setJoined(false);
        var prevJoin = tour.joinIds;
        var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
        updateJoin(newJoin);

        dispatch(unJoinTour(tour._id, auth.token, () => {
            setState({
                loadingJoin: false,
                error: false,
            })
        }, () => {
            setState({
                loadingJoin: false,
                error: true,
            })
            if (!joined) {
                setJoined(true);
                updateJoin(prevJoin);
            }
        }))
    }

    useEffect(() => {
        if (tour && tour.tour[idx].locations.length > 0) {
            setPosition(tour.tour[idx].locations[0].location.position)
        }
    }, [tour, idx])

    useEffect(() => {
        var locs = tour.tour[idx].locations.filter(item => item.location).map(item => item.location);
        setLocations(locs);
    }, [tour, idx])

    const refDetail = React.createRef();
    const refUser = React.createRef();

    const DetailDateRef = React.forwardRef((props, ref) =>
        <DetailDate {...props} innerRef={ref} />
    )

    const UserListRef = React.forwardRef((props, ref) =>
        <UserList {...props} innerRef={ref} />
    )



    return (
        <>
            {
                tour ?
                    <div style={{ marginTop: 100 }}>
                        <Grid container>
                            <Grid item md={6} sm={12} xs={12}>
                                <div className={classes.infoTour}>
                                    <div className={classes.coverTitle}>
                                        <Typography variant="h4" className={classes.title}>{tour.name}</Typography>
                                    </div>
                                    <Grid container>
                                        <Grid item md={8} sm={12} xs={12} style={{ paddingLeft: 30 }}>
                                            <Typography variant="body1">
                                                {tour.content}
                                            </Typography>
                                            <div className={classes.hashtagWrap}>
                                                {tour.hashtags.map((hashtag, index) => (
                                                    <Typography className={classes.hashtag} key={index}>#{hashtag}</Typography>
                                                ))}
                                            </div>
                                            <Typography variant="body1">
                                                Tổng chi phí: {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                                            </Typography>
                                            {
                                                !isOwn && joinLoc === 0 &&
                                                <>
                                                    {
                                                        state.loadingJoin ?
                                                            <CircularProgress /> :
                                                            <Button onClick={joined ? handleUnJoin : handleJoin}>
                                                                {joined ? "Hủy tham gia" : "Tham gia"}
                                                            </Button>

                                                    }
                                                </>
                                            }
                                            <div>
                                                <Typography>Danh sách tham gia toàn bộ tour:</Typography>
                                                <AvatarGroup max={4} onClick={handleShowJoin} style={{ cursor: 'pointer' }}>
                                                    {tour.joinIds.map(user =>
                                                        <Avatar src={user.avatar} alt={'A'} key={user._id} style={{ height: 30, width: 30 }} />
                                                    )}
                                                </AvatarGroup>
                                                <Modal
                                                    aria-labelledby="like"
                                                    aria-describedby="user-like-this-post"
                                                    className={classes.modal}
                                                    open={showUserJoin}
                                                    onClose={handleCloseJoin}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <UserListRef ref={refUser} listUser={tour.joinIds} title={"Đã tham gia"} handleClose={handleCloseJoin} />
                                                </Modal>
                                            </div>
                                        </Grid>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <div style={{ paddingRight: 40 }}>
                                                <img src={tour.image} className={classes.image} width="100%" alt="Can not load" onClick={handleShowImage} />
                                                <ImageModal
                                                    open={showImage}
                                                    handleClose={handleCloseImage}
                                                    img={tour.image}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid container >
                                    <Grid item md={3} sm={12} xs={12}>
                                        <div className={classes.timeline}>
                                            {tour.tour.map((item, index) => (
                                                <div key={index} className={classes.timelineItem}>
                                                    <div style={{ display: 'flex' }}>
                                                        <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                                            {convertDateToStr(item.date)}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Grid>
                                    <Grid item md={9} sm={12} xs={12}>
                                        {/* <EditDescriptionDate date={idx} description={createTour.tour[idx].description} /> */}
                                        <Button onClick={handleShowDetailDate}>Chi tiết ngày</Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={detailDate}
                                            className={classes.modal}
                                            onClose={handleCloseDetailDate}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={detailDate}>
                                                <DetailDateRef ref={refDetail} date={idx} tourDate={tour.tour[idx]} handleClose={handleCloseDetailDate} joined={joined} />
                                            </Fade>
                                        </Modal>
                                        <div style={{ paddingInline: 30 }}>
                                            {
                                                tour.tour[idx].locations.map((item, index) => (
                                                    <Location
                                                        location={item}
                                                        indexDate={idx}
                                                        tourDateId={tour.tour[idx]._id}
                                                        indexLocation={index}
                                                        edit={false}
                                                        key={index}
                                                        isSave={true}
                                                        isEdit={false}
                                                        addReview={createReview}
                                                        joined={joined}
                                                        joinIds={tour.joinIds}
                                                        isOwn={isOwn}
                                                        updateJoinLocation={updateJoinLocation}
                                                        joinLoc={joinLoc}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} className={classes.hiddenSmall}>
                                {
                                    isOwn &&
                                    <div style={{ display: 'flex', justifyContent: 'right', marginRight: 100 }}>
                                        <Button startIcon={(<Update />)} component={Link} to={'?edit=true'}>
                                            Chỉnh sửa hành trình
                                        </Button>
                                    </div>
                                }
                                <div style={{ padding: 20 }}>
                                    {position ? <MapCard position={position} zoom={12} locations={locations} /> : <div></div>}
                                </div>
                            </Grid>
                        </Grid>
                        {/* <div className={classes.coverTitle}>
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
                                        <Typography>{tour.tour[idx].description}</Typography>
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
                                            {position ? <MapCard position={position} zoom={12} locations={locations} /> : <div></div>}
                                        </Container>
                                    </Grid>
                                </Grid>
                            </Container>

                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Container style={{ marginTop: 20 }}>
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

                            </Container>
                        </TabPanel>

 */}

                    </div >
                    :
                    <CircularProgress color={"inherit"} />
            }
        </>
    )
}