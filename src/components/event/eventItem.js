import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { eventStyles } from "../../style";

export default function EventItem(props) {

    const classes = eventStyles();

    return (
        <Card
            className={classes.eventCardContainer}
            tabIndex={0}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.event.image}
                    title={props.event.name}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {props.event.name}
                </Typography>
                <Typography>
                    {props.event.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.event.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={'/event/' + props.event.id}>
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    )
}