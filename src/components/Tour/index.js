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
import { postStyles } from "../../style";
import InputComment from "../Input/Comment";
import UserList from "../Modal/UserList";

import SharePost from "../Forms/Share";
import TourContent from "./Content";
import { likeTour, unlikeTour } from "../../redux/callApi/tourCall";
import LoginModal from "../Modal/Login";
import HeartFillIcon from "../Icons/HeartFill";
import HeartIcon from "../Icons/Heart";
import CommentIcon from "../Icons/Comment";
import ShareIcon from "../Icons/Share";
import { loadComment } from "../../redux/callApi/commentCall";


export default function Tour(props) {

    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [tour, setTour] = useState(null);
    const [share, setShare] = useState(false);
    const [login, setLogin] = useState(false);

    const [loadingComment, setLoadingComment] = useState(false);
    const [errorComment, setErrorComment] = useState(false);
    const [pageComment, setPageComment] = useState(0);

    const updateLike = (likes) => {
        setTour({
            ...tour,
            likes: likes
        })
    }



    const classes = postStyles({ showCmt });

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
        let prevLike = tour.likes;
        let newLike = [...prevLike, auth.user]
        updateLike(newLike);

        dispatch(likeTour(tour._id, auth, socket, () => {
            if (like) {
                setLike(false);
                updateLike(prevLike);
            }
        }))
    }

    const handleUnlike = () => {
        setLike(false);
        let prevLike = tour.likes;
        let newLikes = prevLike.filter(user => user._id !== auth.user._id);
        updateLike(newLikes);

        dispatch(unlikeTour(tour._id, auth, socket, () => {
            if (!like) {
                setLike(true);
                updateLike(prevLike);
            }
        }))
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
        dispatch(loadComment(tour._id, "tour", () => {
            setLoadingComment(false);
            setPageComment(state => state + 1);
        }, () => {
            setLoadingComment(false);
            setErrorComment(true);
        }, pageComment))

    }


    const handleShowCmt = () => {
        if (!showCmt) {
            if (!tour.commentDetail) {
                setLoadingComment(true);
                dispatch(loadComment(tour._id, "tour", () => {
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

    useEffect(() => {
        setTour(props.tour);
    }, [props.tour]);


    useEffect(() => {
        if (tour) {
            if (auth.user && tour.likes.find(like => like._id === auth.user._id)) {
                setLike(true);
            }
        }


    }, [tour, auth.user]);




    const handleCloseLogin = () => {
        setLogin(false);
    }

    const handleShowShare = () => {
        setShare(true);
    }

    const handleCloseShare = () => {
        setShare(false);
    }


    const refLogin = React.createRef();
    const refUser = React.createRef();
    const refShare = React.createRef();

    const LoginRef = React.forwardRef((props, ref) => (
        <LoginModal {...props} innerRef={ref} />
    ))

    const UserListRef = React.forwardRef((props, ref) => (
        <UserList {...props} innerRef={ref} />
    ))

    const ShareRef = React.forwardRef((props, ref) => (
        <SharePost {...props} innerRef={ref} />
    ))

    return (
        <Card className={classes.cardContainer}>
            <>
                {tour && <>
                    <TourContent tour={tour} setTour={setTour} />

                    <CardActions>
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
                            <LoginRef ref={refLogin} />
                        </Modal>

                        <Typography className={classes.numLike} onClick={handleOpen}>
                            {tour?.likes.length}
                        </Typography>
                        <Modal
                            aria-labelledby="like"
                            aria-describedby="user-like-this-tour"
                            className={classes.modal}
                            open={showLike}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <UserListRef ref={refUser} listUser={tour.likes} title={"Đã thích"} handleClose={handleClose} />
                        </Modal>
                        <div className={classes.iconWrap}>
                            <CommentIcon onClick={handleShowCmt} className={classes.iconButton} />
                        </div>

                        <Typography className={classes.numCmt}>
                            {tour.comments.length}
                        </Typography>
                        <div className={classes.iconWrap}>
                            <ShareIcon onClick={handleShowShare} className={classes.iconButton} />
                        </div>

                        <Modal
                            aria-labelledby="share"
                            aria-describedby="share-this-tour"
                            className={classes.modal}
                            open={share}
                            onClose={handleCloseShare}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <ShareRef ref={refShare} object={tour.shareId ? tour.shareId : tour} type="tour" handleClose={handleCloseShare} />
                        </Modal>
                    </CardActions>


                    <Collapse className={classes.cmt} in={showCmt}>
                        <hr className={classes.line} />
                        <div className={classes.listCmt}>
                            {tour.commentDetail && tour.commentDetail.map((cmt) => (
                                <Comment comment={cmt} key={cmt._id} id={tour._id} type="tour" />
                            ))}
                        </div>
                        {loadingComment && <Typography>Đang tải...</Typography>}
                        {errorComment && <Typography>Có lỗi xảy ra</Typography>}
                        {tour.commentDetail && !loadingComment && tour.commentDetail?.length < tour.comments?.length &&
                            <Typography onClick={loadMoreComment}>Xem thêm bình luận</Typography>
                        }
                    </Collapse>

                    <InputComment type="tour" id={tour._id} />
                </>}
            </>
        </Card>
    )
}