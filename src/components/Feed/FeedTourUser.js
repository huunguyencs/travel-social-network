import React from "react";
import { Button, CircularProgress, Typography } from "@material-ui/core";

import Tour from "../Tour";
import { feedStyles } from "../../style";
import { useSelector, useDispatch } from "react-redux";
import { getUserTour } from "../../redux/callApi/tourCall"



export default function FeedUserTour(props) {

    const { id } = props;
    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);

    const classes = feedStyles();


    const tryAgain = () => {
        if (id) {
            dispatch(getUserTour(id, auth.token))
        }

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