import { Button, Container, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'

import { tourdetailStyles } from "../../style";
import Location from './Location';
import { convertDateToStr } from "../../utils/date";
// import { useSelector } from "react-redux";
import MapCard from "../card/MapCard";
import { Link } from "react-router-dom";




export default function TourDetail(props) {

    const classes = tourdetailStyles();

    const [idx, setIdx] = useState(0);
    const [position, setPosition] = useState(null);
    const [locations, setLocations] = useState([]);

    const { tour, isOwn } = props;




    useEffect(() => {
        if (tour && tour.tour[idx].locations.length > 0) {
            setPosition(tour.tour[idx].locations[0].location.position)
        }
    }, [tour, idx])

    useEffect(() => {
        var locs = tour.tour[idx].locations.map(item => item.location);
        setLocations(locs);
    }, [tour, idx])



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
                                <Typography variant="body1" className={classes.content}>
                                    Chi phí: {tour.cost ? new Intl.NumberFormat().format(tour.cost * 1000) : 0} VND
                                </Typography>
                            </div>
                            <div className={classes.hashtagWrap}>
                                {tour.hashtags.map((hashtag, index) => (
                                    <Typography className={classes.hashtag} key={index}>{hashtag}</Typography>
                                ))}
                            </div>
                        </div>

                        <Grid container className={classes.container}>
                            <Grid item md={2} >
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


                            </Grid>
                            <Grid item md={6} className={classes.feedTour}>
                                <Button component={Link} to={`?edit=true`}>Chỉnh sửa hành trình</Button>
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
                                        />
                                    ))
                                }

                            </Grid>
                            <Grid item md={4}>
                                <Container className={classes.mapRight}>
                                    {position && <MapCard position={position} zoom={12} locations={locations} />}
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