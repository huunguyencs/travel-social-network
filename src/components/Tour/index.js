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
import { postStyles } from "../../style";
import InputComment from "../Input/Comment";
import UserList from "../Modal/UserList";

import SharePost from "../Forms/Share";
import TourContent from "./Content";
import { likeTour, unlikeTour } from "../../redux/callApi/tourCall";
import LoginModal from "../Modal/Login";


export default function Tour(props) {

    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [tour, setTour] = useState(null);
    const [share, setShare] = useState(false);
    const [login, setLogin] = useState(false);

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

    const handleCommentPress = () => {
        setShowCmt(state => !state);
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
                        <QuestionAnswer onClick={handleCommentPress} className={classes.iconButton} />
                        <Typography className={classes.numCmt}>
                            {tour.comments.length}
                        </Typography>
                        <Share onClick={handleShowShare} className={classes.iconButton} />
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
                            {tour.comments.map((cmt) => (
                                <Comment comment={cmt} key={cmt._id} id={tour._id} type="tour" />
                            ))}
                        </div>
                    </Collapse>

                    <InputComment type="tour" id={tour._id} />
                </>}
            </>
        </Card>
    )
}