import { Button, Container, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'

import { tourdetailStyles } from "../../style";
import Location from './Location';
import { convertDateToStr } from "../../utils/date";
import { useSelector } from "react-redux";




export default function TourDetail(props) {

    const classes = tourdetailStyles();
    const [isOwn, setIsOwn] = useState(false);

    const { auth } = useSelector(state => state);

    const { tour } = props;


    useEffect(() => {
        setIsOwn(tour?.userId._id === auth.user._id);
    }, [setIsOwn, tour, auth])

    const [idx, setIdx] = useState(0);

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
                                {
                                    tour.tour[idx].locations.map((item, index) => (
                                        <Location
                                            location={item}
                                            index={index}
                                            edit={false}
                                            key={item._id}
                                            isOwn={isOwn}
                                            isSave={true}
                                            tourId={tour._id}
                                            indexDate={idx}
                                            indexLocation={index}
                                        />
                                    ))
                                }

                            </Grid>
                            <Grid item md={4}>
                                <Container>

                                </Container>
                            </Grid>
                        </Grid>
                    </div >
                    :
                    <CircularProgress color={"black"} />
            }
        </>
    )
}