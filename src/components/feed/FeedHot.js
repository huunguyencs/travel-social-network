import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { feedStyles } from "../../style";
import Event from "../event/event";
import Location from "../location/Location";
import { getLocationHot } from "../../redux/callApi/locationCall";



export default function FeedHot(props) {

    const classes = feedStyles();
    const dispatch = useDispatch();
    const { location } = useSelector(state => state);

    useEffect(() => {
        dispatch(getLocationHot());
        // console.log(location.hot);
    }, [dispatch])

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.event}>
                    <div className={classes.title}>
                        <Typography variant="h4">Sự kiện sắp diễn ra</Typography>
                    </div>

                    <Event />
                </div>
                <div className={classes.hot}>
                    <div className={classes.title}>
                        <Typography variant="h4" style={{ paddingBottom: 20 }}>Địa điểm hot</Typography>
                    </div>
                    <div className={classes.hotFeed}>
                        {location.hot.map((item) =>
                            <Location location={item} key={item._id} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}