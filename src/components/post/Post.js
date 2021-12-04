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
import { useDispatch, useSelector } from "react-redux";

import Comment from "../comment/Comment";
import InputComment from "../input/comment";
import { postStyles } from "../../style";
import ImageList from "../modal/ImageList";
import { Link } from "react-router-dom";
import UserList from "../modal/userList";
import { SeeMoreText } from "../seeMoreText";
import { timeAgo } from "../../utils/date";
import { likePost, unlikePost } from '../../redux/callApi/postCall';


export default function Post(props) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);

    const classes = postStyles({ showCmt });

    const updateLike = (likes) => {
        setPost({
            ...post,
            likes: likes
        })
    }

    const addComment = (comment) => {
        setPost({
            ...post,
            comments: [...post.comments, comment]
        })
    }

    const likePress = () => {
        if (!auth.user || !post) return;
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = () => {
        setLike(true);
        updateLike([...post.likes, auth.user]);
        // call api
        dispatch(likePost(post._id, auth.token, () => {
            setLike(false);
            let newLikes = post.likes.filter(user => user._id !== auth.user._id);
            updateLike(newLikes);
        }));
    }

    const handleUnlike = () => {
        setLike(false);
        let newLikes = post.likes.filter(user => user._id !== auth.user._id);
        updateLike(newLikes);
        // call api
        dispatch(unlikePost(post._id, auth.token, () => {
            setLike(true);
            updateLike([...post.likes, auth.user]);
        }));
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
        setPost(props.post);
    }, [props.post]);

    useEffect(() => {
        if (post) {
            if (auth.user && post.likes.find(like => like._id === auth.user._id)) {
                setLike(true);
            }
        }
    }, [post, auth.user]);

    return (
        <Card className={classes.cardContainer}>
            {post && <>
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
                                <Typography variant="body1" component={Link} to={`/location/${post.locationId._id}`}>{post.locationId.name}</Typography>
                            </div>
                            <Rating name="location-rating" value={post.rate} readOnly style={{ marginBottom: 20 }} />

                        </>
                    }
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
                        {post.likes?.length}
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
                        <UserList listUser={post.likes} title={"Đã thích"} handleClose={handleClose} />
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
                            <Comment comment={cmt} key={cmt._id} id={post._id} type="post" />
                        ))}
                    </div>
                </Collapse>

                <InputComment type="post" id={post._id} addComment={addComment} />
            </>}
        </Card>
    )
}