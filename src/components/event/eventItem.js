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
                    image={event.image}
                    title={event.name}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {event.name}
                </Typography>
                <Typography>
                    {event.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={'/event/' + event._id}>
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    )
}