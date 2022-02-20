import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import { volunteerStyles } from '../../style';
import { convertDateToStr, timeAgo } from '../../utils/date';

export default function VolunteerCard(props) {

    const { volunteer } = props;

    const classes = volunteerStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                image={volunteer.image}
                title={volunteer.name}
                className={classes.media}
            />
            <CardHeader
                avatar={
                    <Avatar
                        alt={volunteer.userId.fullname}
                        src={volunteer.userId.avatar}
                        aria-label='avatar'
                    />
                }
                action={
                    <IconButton aria-label='settings' size='small'>
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.username} component={Link} to={`/u/${volunteer.userId._id}`}>
                        {volunteer.userId.fullname}
                    </Typography>
                }
                subheader={
                    <Typography className={classes.subheader}>
                        {timeAgo(new Date(volunteer.createdAt))}
                    </Typography>
                }
            />
            <CardContent>
                <Typography component={Link} to={`/volunteer/${volunteer._id}`} className={classes.name}>
                    {volunteer.name}
                </Typography>
                <Typography>Thời gian: {convertDateToStr(volunteer.date[0].date)}</Typography>
                <Typography>Địa điểm xuất phát: {volunteer.location[0].location.fullname}</Typography>
                <Typography>Thể loại: Giáo dục</Typography>
            </CardContent>
        </Card>
    )
}
