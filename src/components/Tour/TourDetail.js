import { Button, Container, Grid, Typography, CircularProgress, Modal, Fade, Paper, Backdrop } from "@material-ui/core";
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


export default function TourDetail(props) {

    const classes = tourdetailStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const [idx, setIdx] = useState(0);
    const [position, setPosition] = useState(null);
    const [locations, setLocations] = useState([]);

    const [showService, setShowService] = useState(false);
    const handleShowService = () => {
        setShowService(true);
    }

    const handleCloseService = () => {
        setShowService(false);
    }

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
                            <div className={classes.itemInfo}>
                                <Typography variant="body1" className={classes.content}>
                                    {tour.content}
                                </Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography variant="body1" className={classes.cost} onClick={handleShowService}>
                                    Chi phí: {tour.cost ? new Intl.NumberFormat().format(tour.cost * 1000) : 0} VND
                                </Typography>
                            </div>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={showService}
                                onClose={handleCloseService}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={showService}>
                                    <Paper className={classes.servicePaper}>
                                        <div className={classes.center}>
                                            <Typography variant="h5">Dịch vụ trong tour</Typography>
                                        </div>
                                        {tour.services.map((item, index) => (
                                            <ServiceCard service={item} key={index} review={isOwn} />
                                        ))}
                                    </Paper>
                                </Fade>
                            </Modal>
                            <div className={classes.hashtagWrap}>
                                {tour.hashtags.map((hashtag, index) => (
                                    <Typography className={classes.hashtag} key={index}>{hashtag}</Typography>
                                ))}
                            </div>
                        </div>
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


                        <Grid container className={classes.container}>
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
                                                        {convertDateToStr(new Date(item.date))}
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
                            <Grid item md={6}>
                                <Container className={classes.mapRight}>
                                    <>
                                        {position && <MapCard position={position} zoom={12} locations={locations} />}
                                    </>
                                </Container>
                            </Grid>
                        </Grid>
                    </div >
                    :
                    <CircularProgress color={"inherit"} />
            }
        </>
    )
}