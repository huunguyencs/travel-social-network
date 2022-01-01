import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { SeeMoreText } from "../seeMoreText";
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
                <Typography gutterBottom variant="h5">
                    {event.fullname}
                </Typography>
                <Typography style={{ marginBottom: 10 }}>
                    {event.timedes}
                </Typography>
                <SeeMoreText variant="body2" text={event.description} maxText={180} />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={'/event/' + event.name}>
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    )
}