import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, Fade, Modal, Typography } from "@material-ui/core";

import Tour from "../tour/Tour";
import { feedStyles } from "../../style";
import CreateTourForm from "../forms/createTour";
import { useSelector, useDispatch } from "react-redux";
import { getTours, getUserTour } from "../../redux/callApi/tourCall"



export default function FeedTour(props) {

    const { id } = props;
    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);

    const classes = feedStyles();

    const [show, setShow] = useState(false);

    const tryAgain = () => {

        dispatch(getTours());
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.feedContent}>
                    {
                        tour.loading ?
                            tour.error ?
                                <div className={classes.centerMarginTop}>
                                    <div>
                                        <Typography>Có lỗi xảy ra</Typography>
                                        <Button onClick={tryAgain}>Thử lại</Button>
                                    </div>
                                </div> :
                                <div className={classes.centerMarginTop}>
                                    <CircularProgress color={"inherit"} />
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