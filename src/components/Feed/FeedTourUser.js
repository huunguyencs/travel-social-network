import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@material-ui/core";

import Tour from "../Tour";
import { feedStyles } from "../../style";
import { useSelector, useDispatch } from "react-redux";
import { getUserTour } from "../../redux/callApi/tourCall"
import SuccessIcon from "../Icons/Success";



export default function FeedUserTour(props) {

    const { id } = props;
    const dispatch = useDispatch();
    const { auth, tour } = useSelector(state => state);

    const classes = feedStyles();

    const [fetch, setFetch] = useState(false);
    const loadTour = (id, token, page, dispatch, hasMore) => {
        if (hasMore) {
            dispatch(getUserTour(id, token, page))
        }
        setFetch(false);
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    useEffect(() => {
        if (fetch) {
            loadTour(id, auth.token, tour.page, dispatch, tour.hasMore);
        }
    }, [fetch, id, auth.token, tour.page, dispatch, tour.hasMore])


    const tryAgain = () => {
        if (id) {
            loadTour(id, auth.token, tour.page, dispatch, tour.hasMore);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.feedContent}>

                    {!tour.loading && !tour.error &&
                        tour.tours.map((tour) => (
                            <Tour
                                tour={tour}
                                key={tour._id}
                            />
                        ))
                    }
                    {tour.error &&
                        <div className={classes.centerMarginTop}>
                            <div>
                                <Typography>Có lỗi xảy ra</Typography>
                                <Button onClick={tryAgain}>Thử lại</Button>
                            </div>
                        </div>
                    }
                    {tour.loading &&
                        <div className={classes.centerMarginTop}>
                            <CircularProgress color={"inherit"} />
                        </div>
                    }
                    {
                        !tour.loading && !tour.error && !tour.hasMore &&
                        <div style={{ textAlign: 'center', marginBlock: 30 }}>
                            <SuccessIcon style={{ margin: 'auto', fontSize: 50 }} />
                            <Typography style={{ margin: 'auto', fontSize: 24 }}>Bạn đã xem hết hành trình</Typography>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}