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
import { Link } from 'react-router-dom'


import Comment from "../comment/Comment";
import { postStyles } from "../../style";
import InputComment from "../input/comment";
import UserList from "../modal/userList";
import { SeeMoreText } from "../seeMoreText";
import ImageModal from "../modal/image";
import { useDispatch, useSelector } from "react-redux";
import { likeTour, unlikeTour } from "../../redux/callApi/tourCall";


export default function Tour(props) {

    const { tour } = props;
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(tour.likes?.length);
    const [open, setOpen] = useState(false);

    const handleCloseImage = () => {
        setOpen(false);
    }

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

        dispatch(likeTour(tour._id, auth.token, () => {
            setLike(false);
            setNumLike(state => state - 1);
        }))
    }

    const handleUnlike = () => {
        setLike(false);
        setNumLike(state => state - 1);

        dispatch(unlikeTour(tour._id, auth.token, () => {
            setLike(true);
            setNumLike(state => state + 1);
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
        if (auth.user && tour.likes.find(like => like._id === auth.user._id)) {
            setLike(true);
        }
    }, [tour.likes, auth.user])


    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={tour.userId.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.userName} component={Link} to={`/profile/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
                }
            />
            {tour.image !== "" &&
                <CardMedia>
                    <img src={tour.image} className={classes.image} width="100%" alt="Can not load" onClick={() => setOpen(true)} />
                    <ImageModal
                        open={open}
                        handleClose={handleCloseImage}
                        img={tour.image}
                    />
                </CardMedia>
            }


            <CardContent>
                <Typography variant="h6" className={classes.title} component={Link} to={`tour/${tour._id}`}>
                    {tour.name}
                </Typography>
                <SeeMoreText
                    variant="body1"
                    maxText={6}
                    text={tour.content}
                />
                <Typography style={{ marginTop: 20 }}>
                    Thời gian: {tour.tour?.length} ngày
                </Typography>
                <div>
                    <Typography>Thành viên tham gia: {tour.taggedIds.length + 1}</Typography>
                </div>

                <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((item) =>
                        <Typography className={classes.hashtag}>{item}</Typography>
                    )}
                </div>

            </CardContent>

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
                    <UserList listUser={tour.likes} title={"Đã thích"} handleClose={handleClose} />
                </Modal>
                <IconButton onClick={() => (setShowCmt(value => !value))}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {tour.comments.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
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

        </Card>
    )
}