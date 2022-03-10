import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Card,
    CardActions,
    Collapse,
    Modal,
    Typography
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Comment from "../Comment";
import InputComment from "../Input/Comment";
import { postStyles } from "../../style";
import UserList from "../Modal/UserList";
import SharePost from "../Forms/Share";
import PostContent from "./Content";
import { likePost, unlikePost } from '../../redux/callApi/postCall';
import LoginModal from "../Modal/Login";
import HeartIcon from "../Icons/Heart";
import HeartFillIcon from "../Icons/HeartFill";
import CommentIcon from "../Icons/Comment";
import ShareIcon from "../Icons/Share";
import { loadComment } from "../../redux/callApi/commentCall";


export default function Post(props) {

    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);
    const [share, setShare] = useState(false);
    const [login, setLogin] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);
    const [errorComment, setErrorComment] = useState(false);
    const [pageComment, setPageComment] = useState(0);

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

    const loadMoreComment = () => {
        setLoadingComment(true);
        dispatch(loadComment(post._id, "post", () => {
            setLoadingComment(false);
            setPageComment(state => state + 1);
        }, () => {
            setLoadingComment(false);
            setErrorComment(true);
        }, pageComment))

    }


    const handleShowCmt = () => {
        if (!showCmt) {
            if (!post.commentDetail) {
                setLoadingComment(true);
                dispatch(loadComment(post._id, "post", () => {
                    setLoadingComment(false);
                    setPageComment(1);
                }, () => {
                    setLoadingComment(false);
                    setErrorComment(true);
                }, 0))

            }

        }
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

    const refLogin = React.createRef();
    const refUser = React.createRef();
    const refShare = React.createRef();

    const Login = React.forwardRef((props, ref) => (
        <LoginModal {...props} innerRef={ref} />
    ))

    const User = React.forwardRef((props, ref) => (
        <UserList {...props} innerRef={ref} />
    ))

    const ShareRef = React.forwardRef((props, ref) => (
        <SharePost {...props} innerRef={ref} />
    ))

    return (
        <Card className={classes.cardContainer}>
            {post && <>
                <PostContent post={post} />

                <CardActions style={{ marginLeft: 10 }}>
                    <div className={classes.iconWrap}>
                        {
                            like ? <HeartFillIcon className={classes.likedIcon} onClick={likePress} /> : <HeartIcon className={classes.iconButton} onClick={likePress} />
                        }
                    </div>
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
                        <Login ref={refLogin} />
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
                        <User ref={refUser} listUser={post?.likes} title={"Đã thích"} handleClose={handleClose} />
                    </Modal>
                    <div className={classes.iconWrap}>
                        <CommentIcon onClick={handleShowCmt} className={classes.iconButton} />
                    </div>
                    <Typography className={classes.numCmt}>
                        {post.comments.length}
                    </Typography>
                    <div className={classes.iconWrap}>
                        <ShareIcon onClick={handleShowShare} className={classes.iconButton} />
                    </div>
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
                        <ShareRef ref={refShare} object={post.shareId ? post.shareId : post} type="post" handleClose={handleCloseShare} />
                    </Modal>
                </CardActions>

                <Collapse className={classes.cmt} in={showCmt}>
                    <hr className={classes.line} />
                    <div className={classes.listCmt}>
                        {post.commentDetail && post.commentDetail.map((cmt) => (
                            <Comment comment={cmt} key={cmt._id} id={post._id} type="post" />
                        ))}
                    </div>
                    {loadingComment && <Typography className={classes.loadingComment}>Đang tải...</Typography>}
                    {errorComment && <Typography className={classes.errorComment}>Có lỗi xảy ra</Typography>}
                    {post.commentDetail && !loadingComment && post.commentDetail?.length < post.comments?.length &&
                        <Typography variant="body2" className={classes.loadMoreComment} onClick={loadMoreComment}>Xem thêm bình luận</Typography>
                    }
                </Collapse>

                <InputComment type="post" id={post._id} />
            </>}
        </Card>
    )
}