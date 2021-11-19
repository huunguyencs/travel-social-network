import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";

export default function LocationCard(props) {

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={props.location.image}
            />
            <CardContent>
                <Typography className={classes.locationName} variant="h6">{props.location.locationName}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <div className={classes.star}>
                    <Typography>{props.location.star}</Typography>
                    <Star className={classes.starIcon} />
                </div>
                <Button className={classes.seeMore} component={Link} to={"/location/" + props.location._id}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}