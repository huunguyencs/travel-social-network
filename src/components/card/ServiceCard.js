import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";
import { getStar } from "../../utils/utils";

export default function ServiceCard(props) {

    const { service } = props;

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={service.images[0]}
            />
            <CardContent>
                <Typography className={classes.locationName} variant="h6">{service.fullname.length > 30 ? service.fullname.slice(0, 30) + "..." : service.fullname}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <div className={classes.star}>
                    <Typography>{getStar(service.star)}</Typography>
                    <Star className={classes.starIcon} />
                </div>
                <Button className={classes.seeMore} component={Link} to={"/service/" + service.name}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}