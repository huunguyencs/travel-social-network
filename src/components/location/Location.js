import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

import { locationCardStyles } from "../../style";
import { getStar } from "../../utils/utils";

export default function LocationCard(props) {

    const { location } = props;

    const classes = locationCardStyles();

    return (
        <Card className={classes.locationCardContainer}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={location.images[0]}
                    title={location.fullname}
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={"/location/" + location.name}>
                    {location.fullname}
                </Typography>
                <div style={{ marginTop: 10 }}>
                    <Rating name="read-only" value={getStar(location.star)} readOnly size="small" />
                </div>
            </CardContent>
            <CardActions>
                <Button className={classes.seeMoreBtn} component={Link} to={"/location/" + location.name}>
                    Xem chi tiết
                </Button>
            </CardActions>
        </Card>
    )
}