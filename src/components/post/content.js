import { Avatar, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React from 'react'
import { Link } from 'react-router-dom';

import { postStyles } from '../../style';
import { timeAgo } from '../../utils/date';
import ImageList from '../modal/ImageList';
import { SeeMoreText } from '../seeMoreText';

function ShareContent({ post }) {
    const classes = postStyles();
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={post.userId.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Link to={"/profile/" + post.userId._id} >
                        <Typography noWrap={false} className={classes.userName}>{post.userId.fullname}</Typography>
                    </Link>
                }
                subheader={
                    <Link to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
                        {timeAgo(new Date(post.createdAt))}
                    </Link>
                }
            />
            <CardContent>
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                />
                <div className={classes.hashtagWrap}>
                    {post.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>{item}</Typography>
                    )}
                </div>

                <BaseContent post={post.shareId} />
            </CardContent>
        </>
    )
}

function BaseContent({ post }) {
    const classes = postStyles();
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={post.userId.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Link to={"/profile/" + post.userId._id} >
                        <Typography noWrap={false} className={classes.userName}>{post.userId.fullname}</Typography>
                    </Link>
                }
                subheader={
                    <Link to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
                        {timeAgo(new Date(post.createdAt))}
                    </Link>
                }
            />
            <CardContent>
                {post.isPostReview &&
                    <>
                        <div>
                            <Typography variant="body1" component={Link} to={`/location/${post.locationId._id}`}>{post.locationId.fullname}</Typography>
                        </div>
                        <Rating name="location-rating" value={post.rate} readOnly style={{ marginBottom: 10 }} />

                    </>
                }
                <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                />
                {post.cost && <Typography>Chi phí: {new Intl.NumberFormat().format(post.cost * 1000)} VND</Typography>}
                <div className={classes.hashtagWrap}>
                    {post.hashtags.map((item, index) =>
                        <Typography className={classes.hashtag} key={index}>{item}</Typography>
                    )}
                </div>
            </CardContent>
            {
                post.images.length > 0 &&
                <CardMedia>
                    <ImageList imgList={post.images} />
                </CardMedia>
            }
        </>
    )
}

export default function PostContent({ post }) {

    return (
        <>
            {post && post.shareId ? <ShareContent post={post} /> : <BaseContent post={post} />}
        </>
    )

}
