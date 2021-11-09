import { Button, Container, Grid, Modal, Typography, Backdrop, Fade } from "@material-ui/core";
import React, { useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'

import { tourdetailStyles } from "../../style";
import AddLocationForm from "../forms/addLocation";
import Location from './Location';
import { useDispatch, useSelector } from "react-redux";
import * as tourAction from '../../redux/actions/tourAction';



export default function AddTour(props) {

    const dispatch = useDispatch();
    const { tour } = useSelector(state => state);


    const [idx, setIdx] = useState(0);
    const [addLoc, setAddLoc] = useState(false);

    const handleShow = () => {
        setAddLoc(true);
    }

    const handleClose = () => {
        setAddLoc(false);
    }


    const handleAddDay = () => {
        dispatch(tourAction.addDate());
    }

    const classes = tourdetailStyles();


    return (
        <div>
            <div className={classes.coverTitle}>
                <Typography variant="h3" className={classes.title}>{tour.name}</Typography>
            </div>
            <Grid container className={classes.container}>
                <Grid item md={2} >
                    <Container className={classes.timeline}>
                        <Timeline align="right">
                            {tour.tour.map((item, index) => (
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot className={index === idx ? classes.activeDot : classes.unactiveDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Button className={index === idx ? classes.activeTimeline : classes.unactiveTimeline} onClick={() => setIdx(index)}>
                                            {item.time}
                                        </Button>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                        <Button className={classes.addDay} onClick={handleAddDay}>
                            Thêm ngày
                        </Button>
                    </Container>


                </Grid>
                <Grid item md={6} className={classes.feedTour}>
                    {
                        tour.tour[idx].tour.map((item) => (
                            <Location tour={item} />
                        ))
                    }
                    <div className={classes.addContainer}>
                        <Button className={classes.addTour} onClick={handleShow}>
                            Thêm
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={addLoc}
                            className={classes.modal}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={addLoc}>
                                <AddLocationForm />
                            </Fade>
                        </Modal>
                    </div>

                </Grid>
                <Grid item md={4}>
                    <Container>

                    </Container>
                </Grid>
            </Grid>
        </div >
    )
}