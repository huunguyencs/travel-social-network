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
import { postStyles } from "../../style";
import InputComment from "../input/comment";
import UserList from "../modal/userList";

import SharePost from "../forms/share";
import TourContent from "./content";
import customAxios from "../../utils/fetchData";


export default function Tour(props) {


    const [tour, setTour] = useState(props.tour);
    const { auth } = useSelector(state => state);

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);


    const [share, setShare] = useState(false);

    const updateLike = (likes) => {
        setTour({
            ...tour,
            likes: likes
        })
    }

    const addComment = (comment) => {
        setTour({
            ...tour,
            comments: [...tour.comments, comment]
        })
    }

    const classes = postStyles({ showCmt });

    const likePress = () => {
        if (!auth.user) return;
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = async () => {
        setLike(true);
        let prevLike = tour.likes;
        updateLike([...prevLike, auth.user]);

        try {
            await customAxios(auth.token).patch(`/tour/${tour._id}/like`).then(res => {
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
        let prevLike = tour.likes;
        let newLikes = prevLike.filter(user => user._id !== auth.user._id);
        updateLike(newLikes);

        try {
            await customAxios(auth.token).patch(`/tour/${tour._id}/unlike`).then(res => {
                updateLike(res.data.likes);
            }).catch(err => {
                if (!like) {
                    setLike(true);
                    updateLike(prevLike);
                }
            })
        }
        catch (err) {
            if (!like) {
                setLike(true);
                updateLike(prevLike);
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


    useEffect(() => {
        if (tour?.likes.find(like => like._id === auth?.user._id)) {
            setLike(true);
        }

    }, [tour, auth.user])


    return (
        <Card className={classes.cardContainer}>
            {tour && auth.user && <>
                <TourContent tour={tour} setTour={setTour} />

                <CardActions>
                    {
                        like ? <Favorite className={classes.likedIcon} onClick={likePress} /> : <FavoriteBorderOutlined className={classes.iconButton} onClick={likePress} />
                    }


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
                        <UserList listUser={tour.likes} title={"Đã thích"} handleClose={handleClose} />
                    </Modal>
                    <QuestionAnswer onClick={() => (setShowCmt(value => !value))} className={classes.iconButton} />
                    <Typography className={classes.numCmt}>
                        {tour.comments.length}
                    </Typography>
                    <Share onClick={() => setShare(true)} className={classes.iconButton} />
                    <Modal
                        aria-labelledby="share"
                        aria-describedby="share-this-tour"
                        className={classes.modal}
                        open={share}
                        onClose={() => setShare(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <SharePost object={tour.shareId ? tour.shareId : tour} type="tour" handleClose={() => setShare(false)} />
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

                <InputComment type="tour" id={tour._id} addComment={addComment} />
            </>}
        </Card>
    )
}