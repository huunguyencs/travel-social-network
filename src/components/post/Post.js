import React, { useEffect, useState } from "react";
import {
    Avatar,
    Backdrop,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    Modal,
    Typography
} from "@material-ui/core";
import {
    Favorite,
    FavoriteBorderOutlined,
    MoreVert,
    QuestionAnswer,
    Share
} from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

import Comment from "../comment/Comment";
import InputComment from "../input/comment";
import { postStyles } from "../../style";
import ImageList from "../modal/ImageList";
import { Link } from "react-router-dom";
import UserList from "../modal/userList";
import { SeeMoreText } from "../seeMoreText";
import { timeAgo } from "../../utils/date";
import { useDispatch, useSelector } from "react-redux";

const userList = [
    {
        _id: 132123,
        firstName: "An",
        lastName: "Nguyễn",
        avatarImage: "",
    },
    {
        _id: 456,
        firstName: "An",
        lastName: "Nguyễn",
        avatarImage: "",
    },
    {
        _id: 798,
        firstName: "An",
        lastName: "Nguyễn",
        avatarImage: "",
    }
]



export default function Post(props) {

    const { post } = props;

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(post.likes.length);

    const classes = postStyles({ showCmt });

    const likePress = () => {
        if (!auth.user) return;
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = () => {
        setLike(true);
        setNumLike(state => state + 1);
        // call api

    }

    const handleUnlike = () => {
        setLike(false);
        setNumLike(state => state - 1);
        // call api
    }

    const [showLike, setShowLike] = useState(false);

    const handleOpen = () => {
        setShowLike(true);
    };

    const handleClose = () => {
        setShowLike(false);
    };


    const handleShowCmt = () => {
        setShowCmt(!showCmt)
    }

    useEffect(() => {
        if (auth.user && post.likes.find(like => like._id === auth.user._id)) {
            setLike(true);
        }
    }, [post.likes, auth.user]);

    return (
        <Card className={classes.cardContainer}>
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
                        <Typography className={classes.userName}>{post.userId.fullname}</Typography>
                    </Link>
                }
                subheader={timeAgo(new Date(post.updatedAt))}
            />

            <CardContent>
                {post.isPostReview && <Rating name="location-rating" value={post.rate} readOnly style={{ marginBottom: 20 }} />}
                <SeeMoreText
                    variant="body1"
                    maxText={6}
                    text={post.content}
                />
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



            <CardActions>
                <IconButton onClick={likePress}>
                    {
                        like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                    }

                </IconButton>
                <Typography className={classes.numLike} onClick={handleOpen}>
                    {numLike}
                </Typography>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={showLike}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <UserList listUser={userList} title={"Liked"} handleClose={handleClose} />
                </Modal>
                <IconButton onClick={handleShowCmt}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {post.comments.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>

            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {post.comments.map((cmt) => (
                        <Comment comment={cmt} key={cmt._id} />
                    ))}
                </div>
            </Collapse>

            <InputComment />

        </Card>
    )
}