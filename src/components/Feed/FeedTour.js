import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, Fade, Modal, Typography } from "@material-ui/core";

import Tour from "../Tour";
import { feedStyles } from "../../style";
import CreateTourForm from "../Forms/CreateTour";
import { useSelector, useDispatch } from "react-redux";
import { getTours } from "../../redux/callApi/tourCall"



export default function FeedTour(props) {

    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);

    const classes = feedStyles();

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false);
    }

    const tryAgain = () => {
        dispatch(getTours());
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.createTourContainer}>
                    <Button className={classes.createTour} onClick={handleShow} disabled={!auth.token}>
                        Lên lịch trình ngay!
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={show}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={show}>
                            <CreateTourForm handleClose={handleClose} />
                        </Fade>
                    </Modal>
                </div>


                <div className={classes.feedContent}>
                    {
                        tour.loading ?
                            <div className={classes.centerMarginTop}>
                                <CircularProgress color={"inherit"} />
                            </div> :
                            tour.error ?
                                <div className={classes.centerMarginTop}>
                                    <div>
                                        <Typography>Có lỗi xảy ra</Typography>
                                        <Button onClick={tryAgain}>Thử lại</Button>
                                    </div>
                                </div> :
                                tour.tours.map((tour) => (
                                    <Tour
                                        tour={tour}
                                        key={tour._id}
                                    />
                                ))
                    }
                </div>

            </div>

        </div>
    )
}