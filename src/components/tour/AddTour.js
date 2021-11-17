import { Button, Container, Grid, Modal, Typography, Backdrop, Fade, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@material-ui/lab'
import { useDispatch, useSelector } from "react-redux";

import { tourdetailStyles } from "../../style";
import AddLocationForm from "../forms/addLocation";
import Location from './Location';
import * as tourAction from '../../redux/actions/createTourAction';
// import { useHistory } from "react-router-dom";
import UpdateDateForm from "../forms/updateDate";
import UpdateTourInfo from "../forms/updateInfoCreateTour";



export default function AddTour(props) {

    // const history = useHistory();

    const dispatch = useDispatch();
    const { createTour } = useSelector(state => state);


    const [idx, setIdx] = useState(0);
    const [addLoc, setAddLoc] = useState(false);
    const [showUpdateDate, setShowUpdateDate] = useState(false);
    const [showDeleteDate, setShowDeteleDate] = useState(false);
    const [showChangeInfo, setShowChangeInfo] = useState(false);

    const handleShow = () => {
        setAddLoc(true);
    }

    const handleClose = () => {
        setAddLoc(false);
    }


    const handleAddDay = () => {
        dispatch(tourAction.addDate());
    }

    const handleSave = () => {

        console.log("save tour");
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


    const classes = tourdetailStyles();


    return (
        <div>
            <div className={classes.coverTitle}>
                <Typography variant="h3" className={classes.title}>{createTour.name}</Typography>
            </div>
            <div className={classes.info}>
                <Typography variant="body1" className={classes.content}>
                    {createTour.content}
                </Typography>
                <div className={classes.hashtagWrap}>
                    {createTour.hashtag.map((hashtag, index) => (
                        <Typography className={classes.hashtag} key={index}>{hashtag}</Typography>
                    ))}
                </div>
                <Button onClick={() => setShowChangeInfo(true)}>Chỉnh sửa thông tin</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={showChangeInfo}
                    onClose={() => setShowChangeInfo(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={showChangeInfo}>
                        <UpdateTourInfo />
                    </Fade>
                </Modal>
            </div>

            <Grid container className={classes.container}>
                <Grid item md={2} >
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
                                            {item.time}
                                        </Button>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                        <div>
                            <Button className={classes.addDay} onClick={handleAddDay}>
                                Thêm ngày
                            </Button>
                        </div>
                        <div>
                            <Button className={classes.addDay} onClick={handleSave}>
                                Lưu lại
                            </Button>
                        </div>
                    </Container>


                </Grid>
                <Grid item md={6} className={classes.feedTour}>
                    <div>
                        <Button onClick={handleShowDelete}>
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
                                <Button onClick={handleDeleteDate}>
                                    Xóa
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button onClick={handleShowUpdate}>
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
                                <UpdateDateForm handleClose={handleCloseUpdate} indexDate={idx} currentDate={createTour.tour[idx].time} />
                            </Fade>
                        </Modal>
                    </div>
                    {
                        createTour.tour[idx].tour.map((item, index) => (
                            <Location location={item} indexDate={idx} indexLocation={index} edit={true} key={index} />
                        ))
                    }
                    <div className={classes.addContainer}>
                        <Button className={classes.addTour} onClick={handleShow}>
                            Thêm địa điểm
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
                                <AddLocationForm handleClose={handleClose} indexDate={idx} />
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