import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";

export default function LocationCard(props) {

    const { location } = props;

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={location.images[0]}
            />
            <CardContent>
                <Typography className={classes.locationName} variant="h6">{location.name}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <div className={classes.star}>
                    <Typography>{location.starTotal}</Typography>
                    <Star className={classes.starIcon} />
                </div>
                <Button className={classes.seeMore} component={Link} to={"/location/" + location._id}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}