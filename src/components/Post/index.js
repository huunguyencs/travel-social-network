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
import { useDispatch, useSelector } from "react-redux";

import Comment from "../Comment";
import InputComment from "../Input/Comment";
import { postStyles } from "../../style";
import UserList from "../Modal/UserList";
import SharePost from "../Forms/Share";
import PostContent from "./Content";
import { likePost, unlikePost } from '../../redux/callApi/postCall';
import LoginModal from "../Modal/Login";


export default function Post(props) {

    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);
    const [share, setShare] = useState(false);
    const [login, setLogin] = useState(false);

    const classes = postStyles({ showCmt });

    const updateLike = (likes) => {
        setPost({
            ...post,
            likes: likes
        })
    }


    const likePress = () => {
        if (!auth.user) {
            setLogin(true);
            return;
        };
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = () => {
        setLike(true);
        updateLike([...post.likes, auth.user]);
        // call api
        dispatch(likePost(post._id, auth, socket, () => {
            if (like) {
                setLike(false);
                let newLikes = post.likes.filter(user => user._id !== auth.user._id);
                updateLike(newLikes);
            }
        }));
    }

    const handleUnlike = () => {
        setLike(false);
        let newLikes = post.likes.filter(user => user._id !== auth.user._id);
        updateLike(newLikes);
        // call api
        dispatch(unlikePost(post._id, auth, socket, () => {
            if (!like) {
                setLike(true);
                updateLike([...post.likes, auth.user]);
            }
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

    const handleCloseLogin = () => {
        setLogin(false);
    }

    const handleShowShare = () => {
        setShare(true);
    }

    const handleCloseShare = () => {
        setShare(false);
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
            <>
                {post && <>
                    <PostContent post={post} />

                    <CardActions style={{ marginLeft: 10 }}>
                        {
                            like ? <Favorite className={classes.likedIcon} onClick={likePress} /> : <FavoriteBorderOutlined className={classes.iconButton} onClick={likePress} />
                        }
                        <Modal
                            aria-labelledby="login"
                            aria-describedby="must-login"
                            className={classes.modal}
                            open={login}
                            onClose={handleCloseLogin}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <LoginModal />
                        </Modal>
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
                            <UserList listUser={post?.likes} title={"Đã thích"} handleClose={handleClose} />
                        </Modal>
                        <QuestionAnswer onClick={handleShowCmt} className={classes.iconButton} />
                        <Typography className={classes.numCmt}>
                            {post.comments.length}
                        </Typography>
                        <Share onClick={handleShowShare} className={classes.iconButton} />
                        <Modal
                            aria-labelledby="share"
                            aria-describedby="share-this-post"
                            className={classes.modal}
                            open={share}
                            onClose={handleCloseShare}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <SharePost object={post.shareId ? post.shareId : post} type="post" handleClose={handleCloseShare} />
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

                    <InputComment type="post" id={post._id} />
                </>}
            </>
        </Card>
    )
}