import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { feedStyles } from "../../style";
import Event from "../event/event";
import Location from "../location/Location";
import customAxios from '../../utils/fetchData';



export default function FeedHot(props) {

    const classes = feedStyles();

    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);

    const getCurrentEvent = async () => {
        await customAxios().get('/event/get_events').then(res => {
            setEvents(res.data.events);
        })
    }

    const getHotLocations = async () => {
        await customAxios().get('location/hot_locations').then(res => {
            setLocations(res.data.locations);
        })
    }

    useEffect(() => {
        getHotLocations();
    }, [])

    useEffect(() => {
        getCurrentEvent();
    }, [])

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.event}>
                    <div className={classes.title}>
                        <Typography variant="h4">Sự kiện sắp diễn ra</Typography>
                    </div>

                    <Event events={events} />
                </div>
                <div className={classes.hot}>
                    <div className={classes.title}>
                        <Typography variant="h4">Địa điểm hot</Typography>
                    </div>
                    <div className={classes.hotFeed}>
                        {locations.map((item) =>
                            <Location location={item} key={item._id} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}