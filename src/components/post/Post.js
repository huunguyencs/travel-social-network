import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Card,
    CardActions,
    Collapse,
    Modal,
    Typography
} from "@material-ui/core";
import {
    Favorite,
    FavoriteBorderOutlined,
    QuestionAnswer,
    Share
} from "@material-ui/icons";
import { useSelector } from "react-redux";

import Comment from "../comment/Comment";
import InputComment from "../input/comment";
import { postStyles } from "../../style";
import UserList from "../modal/userList";
import SharePost from "../forms/share";
import PostContent from "./content";
import customAxios from "../../utils/fetchData";


export default function Post(props) {

    const [post, setPost] = useState(props.post);

    const { auth } = useSelector(state => state);

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [share, setShare] = useState(false);

    const classes = postStyles({ showCmt });

    const updateLike = (likes) => {
        setPost({
            ...post,
            likes: likes
        })
    }

    const addComment = (comment) => {
        setPost((state) => ({
            ...state,
            comments: [...state.comments, comment]
        }))
    }

    const likePress = () => {
        if (!auth.user || !post) return;
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = async () => {
        setLike(true);
        let prevLike = post.likes;
        updateLike([...prevLike, auth.user]);
        try {
            await customAxios(auth.token).patch(`/post/${post._id}/like`).then(res => {
                updateLike(res.data.likes);
            }).catch(err => {
                if (like) {
                    setLike(false);
                    updateLike(prevLike)
                }
            })
        }
        catch (err) {
            if (like) {
                setLike(false);
                updateLike(prevLike)
            }
        }
    }

    const handleUnlike = async () => {
        setLike(false);
        let prevLike = post.likes;
        let newLikes = prevLike.filter(user => user._id !== auth.user._id);
        updateLike(newLikes);
        // call api
        try {
            await customAxios(auth.token).patch(`/post/${post._id}/unlike`).then(res => {
                updateLike(res.data.likes);
            }).catch(err => {
                if (!like) {
                    setLike(true);
                    updateLike(prevLike)
                }

            })
        }
        catch (err) {
            if (!like) {
                setLike(true);
                updateLike(prevLike)
            }
        }
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
        if (post) {
            if (auth.user && post.likes.find(like => like._id === auth.user._id)) {
                setLike(true);
            }
        }

    }, [post, auth.user]);

    return (
        <Card className={classes.cardContainer}>
            {post && <>
                <PostContent post={post} />

                <CardActions style={{ marginLeft: 10 }}>
                    {
                        like ? <Favorite className={classes.likedIcon} onClick={likePress} /> : <FavoriteBorderOutlined className={classes.iconButton} onClick={likePress} />
                    }

                    <Typography className={classes.numLike} onClick={handleOpen}>
                        {post.likes.length}
                    </Typography>
                    <Modal
                        aria-labelledby="like"
                        aria-describedby="user-like-this-post"
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
                    <QuestionAnswer onClick={handleShowCmt} className={classes.iconButton} />
                    <Typography className={classes.numCmt}>
                        {post.comments.length}
                    </Typography>
                    <Share onClick={() => setShare(true)} className={classes.iconButton} />
                    <Modal
                        aria-labelledby="share"
                        aria-describedby="share-this-post"
                        className={classes.modal}
                        open={share}
                        onClose={() => setShare(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <SharePost object={post.shareId ? post.shareId : post} type="post" handleClose={() => setShare(false)} />
                    </Modal>
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