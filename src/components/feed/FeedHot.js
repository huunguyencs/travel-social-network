import { Button, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { feedStyles } from "../../style";
import Event from "../event/event";
import Location from "../location/Location";
import customAxios from '../../utils/fetchData';



export default function FeedHot(props) {

    const classes = feedStyles();

    const [events, setEvents] = useState([]);
    const [stateEvent, setStateEvent] = useState({
        loading: false,
        error: false
    })
    const [locations, setLocations] = useState([]);
    const [stateLocation, setStateLocation] = useState({
        loading: false,
        error: false
    })

    const getCurrentEvent = async () => {
        setStateEvent({
            loading: true,
            error: false
        })
        await customAxios().get('/event/get_events').then(res => {
            setEvents(res.data.events);
            setStateEvent({
                loading: false,
                error: false
            })
        }).catch(err => {
            setStateEvent({
                loading: false,
                error: true
            })
        })
    }

    const getHotLocations = async () => {
        setStateLocation({
            loading: true,
            error: false
        })
        await customAxios().get('location/hot_locations').then(res => {
            setLocations(res.data.locations);
            setStateLocation({
                loading: false,
                error: false
            })
        }).catch(err => {
            setStateLocation({
                loading: false,
                error: true
            })
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
                    {
                        stateEvent.loading ?
                            <div>
                                <CircularProgress />
                            </div> :
                            stateEvent.error ?
                                <div>
                                    <Button onClick={getCurrentEvent}>Thử lại</Button>
                                </div> :
                                <Event events={events} />
                    }

                </div>
                <div className={classes.hot}>
                    <div className={classes.title}>
                        <Typography variant="h4">Địa điểm hot</Typography>
                    </div>
                    <div className={classes.hotFeed}>
                        {stateLocation.loading ?
                            <div className={classes.centerMarginTop}>
                                <CircularProgress />
                            </div> :
                            stateLocation.error ?
                                <div className={classes.centerMarginTop}>
                                    <Button onClick={getHotLocations}>Thử lại</Button>
                                </div> :
                                locations.map((item) =>
                                    <Location location={item} key={item._id} />
                                )}
                    </div>
                </div>
            </div>
        </Container>
    )
}