import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { cardStyles } from '../../style';
import { SeeMoreText } from '../seeMoreText';

export default function ProvinceCard(props) {

    const { province } = props;

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardActionArea>
                <CardMedia
                    image={province.image}
                    title={province.fullname}
                    className={classes.imageProvince}
                />
            </CardActionArea>
            <CardContent>
                <Typography variant='h5' component={Link} to={`/province/${province.name}`} className={classes.link}>
                    {province.fullname}
                </Typography>
                <SeeMoreText maxText={80} text={province.information} variant="body2" />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={`/province/${province.name}`}>
                    Chi tiết
                </Button>
            </CardActions>
        </Card>
    );
}
