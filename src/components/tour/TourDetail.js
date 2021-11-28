import { Button, Container, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { useParams } from "react-router-dom";

import { tourdetailStyles } from "../../style";
import Location from './Location';
import { useDispatch } from "react-redux";
import { getTourDetail } from "../../redux/callApi/tourCall";
import { convertDateToStr } from "../../utils/date";




export default function TourDetail(props) {
    const dispatch = useDispatch();
    // const { tour } = useSelector(state => state);
    const [tour, setTour] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTourDetail(id, (tour) => {
            setTour(tour);
        }));
    }, [dispatch, id, setTour])

    const [idx, setIdx] = useState(0);

    const classes = tourdetailStyles();

    const hashtagSplit = (text) => {
        var ht = text.split(" ");
        return ht.filter(item => item !== "");
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
                            <div className={classes.hashtagWrap}>
                                {hashtagSplit(tour.hashtags).map((hashtag, index) => (
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
                                                        {convertDateToStr(item.date)}
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
                                        <Location location={item} index={index} edit={false} key={item._id} />
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