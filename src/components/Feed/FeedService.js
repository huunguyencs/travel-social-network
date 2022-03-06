import { CircularProgress, Container } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

import { feedStyles } from "../../style";
import ServiceItem from "../Service/ServiceItem";
// import Post from "../post/Post";



export default function FeedService(props) {

    const classes = feedStyles();
    const { service } = useSelector(state => state);

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
                            Có lỗi xảy ra
                        </div>
                    }
                </div>
            </div>
        </Container>
    )
}