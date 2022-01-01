import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { eventStyles } from "../../style";

export default function EventItem(props) {

    const { event } = props;

    const classes = eventStyles();

    return (
        <Card
            className={classes.eventCardContainer}
            tabIndex={0}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={event.images[0]}
                    title={event.fullname}
                />
            </CardActionArea>
            <CardContent>
                <Typography variant="h5" component={Link} to={'/event/' + event.name}>
                    {event.fullname}
                </Typography>
                <Typography style={{ marginBottom: 10 }} variant="h6">{event.provinceId ? event.provinceId.fullname : "Cả nước"}</Typography>
                <Typography style={{ marginBottom: 10 }}>
                    {event.timedes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={'/event/' + event.name}>
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    )
}