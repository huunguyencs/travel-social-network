import { Button, CircularProgress, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/callApi/serviceCall";
// import { useDispatch } from "react-redux";

import { feedStyles } from "../../style";
import ServiceItem from "../Service/ServiceItem";
// import Post from "../post/Post";



export default function FeedService(props) {

    const classes = feedStyles();
    const { service } = useSelector(state => state);

    const [fetch, setFetch] = useState(false);
    const dispatch = useDispatch();

    const tryAgain = () => {
        dispatch(getServices(null, service.page))
    }

    const loadPost = (page, hasMore, dispatch) => {
        if (hasMore) {
            dispatch(getServices(null, page))
        }
        setFetch(false);
    }

    useEffect(() => {
        if (fetch) {
            loadPost(service.page, service.hasMore, dispatch)
        }
    }, [fetch, service.page, service.hasMore, dispatch])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }

    return (
        <Container className={classes.container}>
            <div className={classes.content}>

                <div>
                    {
                        service.services.map((item) => (
                            <ServiceItem key={item._id} service={item} />
                        ))
                    }
                    {
                        service.loading &&
                        <div className={classes.centerMarginTop}>
                            <CircularProgress />
                        </div>
                    }
                    {
                        service.error &&
                        <div className={classes.centerMarginTop}>
                            <Button onClick={tryAgain}>Thử lại</Button>
                        </div>
                    }
                </div>
            </div>
        </Container>
    )
}