import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";

export default function ServiceCard(props) {

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={props.service.image}
            />
            <CardContent>
                <Typography className={classes.locationName} variant="h6">{props.service.name}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <div className={classes.star}>
                    <Typography>{props.service.star}</Typography>
                    <Star className={classes.starIcon} />
                </div>
                <Button className={classes.seeMore} component={Link} to={"/service/" + props.service._id}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}