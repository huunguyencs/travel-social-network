import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import { locationCardStyles } from "../../style";

export default function LocationCard(props) {

    const classes = locationCardStyles();

    return (
        <Card className={classes.locationCardContainer}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.location.image}
                    title={props.location.name}
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography variant="h5">
                    {props.location.name}
                </Typography>
                <Rating name="read-only" value={props.location.rate} readOnly size="small" />
                <Typography variant="body1">
                    {props.location.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.seeMoreBtn} component={Link} to={"/location/" + props.location.id}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}