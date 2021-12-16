import React, { useEffect, useState } from "react";
import {
    Avatar,
    Backdrop,
    Button,
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
import { useDispatch, useSelector } from "react-redux";


import Comment from "../comment/Comment";
import { postStyles } from "../../style";
import InputComment from "../input/comment";
import UserList from "../modal/userList";
import { SeeMoreText } from "../seeMoreText";
import ImageModal from "../modal/image";
import { likeTour, unlikeTour, joinTour, unJoinTour } from "../../redux/callApi/tourCall";
import { convertDateToStr, timeAgo } from "../../utils/date";
import ManageUserJoin from "../modal/manageUserJoin";
import SharePost from "../forms/share";


export default function Tour(props) {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(false);
    const [open, setOpen] = useState(false);
    const [join, setJoin] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [tour, setTour] = useState(null);
    const [share, setShare] = useState(false);

    const updateLike = (likes) => {
        setTour({
            ...tour,
            likes: likes
        })
    }

    const updateJoin = (joins) => {
        setTour({
            ...tour,
            joinIds: joins
        })
    }

    const addComment = (comment) => {
        setTour({
            ...tour,
            comments: [...tour.comments, comment]
        })
    }

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
        let prevLike = tour.likes;
        let newLike = [...prevLike, auth.user]
        updateLike(newLike);

        dispatch(likeTour(tour._id, auth.token, () => {
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

        dispatch(unlikeTour(tour._id, auth.token, () => {
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
        if (auth.user && tour && tour.likes.find(like => like._id === auth.user._id)) {
            setLike(true);
        }

    }, [tour, auth.user])

    useEffect(() => {
        if (auth.user && tour && tour.joinIds.includes(auth.user._id)) {
            setJoin(true);
        }

    }, [tour, auth.user]);

    const handleJoin = async () => {
        setJoin(true);
        var prevJoin = tour.joinIds;
        updateJoin([...prevJoin, auth.user]);
        dispatch(joinTour(tour._id, auth.token, () => {
            if (join) {
                setJoin(false);
                updateJoin(prevJoin);
            }
        }))
    }

    const handleUnJoin = () => {
        setJoin(false);
        var prevJoin = tour.joinIds;
        var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
        updateJoin(newJoin);

        dispatch(unJoinTour(tour._id, auth.token, () => {
            if (!join) {
                setJoin(true);
                updateJoin(prevJoin);
            }
        }))
    }

    const joinClick = () => {
        if (join) {
            handleUnJoin();
        }
        else handleJoin();
    }


    return (
        <Card className={classes.cardContainer}>
            {tour && auth.user && <>
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
                        <Typography noWrap={false} className={classes.userName} component={Link} to={`/profile/${tour.userId._id}`}>{tour.userId.fullname}</Typography>
                    }
                    subheader={
                        <Link to={`/tour/${tour._id}`} style={{ cursor: "pointer" }}>
                            {timeAgo(new Date(tour.createdAt))}
                        </Link>
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
                    <div>
                        {new Date(tour.tour[0]?.date) > new Date() && tour.userId._id !== auth.user?._id &&
                            <Button onClick={joinClick}>{join ? "Rời khỏi tour" : "Tham gia tour"}</Button>

                        }
                    </div>
                    <Typography variant="h6" className={classes.title} component={Link} to={`/tour/${tour._id}`}>
                        {tour.name}
                    </Typography>
                    <SeeMoreText
                        variant="body1"
                        maxText={100}
                        text={tour.content}
                    />
                    <Typography style={{ marginTop: 20 }}>
                        Thời gian: {tour.tour?.length} ngày - Bắt đầu {convertDateToStr(tour.tour[0]?.date)}
                    </Typography>
                    <div>
                        <Typography>Thành viên tham gia:
                            <span className={classes.numLike} onClick={() => setOpenJoin(true)} style={{ marginInline: 10 }}>
                                {tour.joinIds.length + 1}
                            </span>
                        </Typography>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openJoin}
                            onClose={() => setOpenJoin(false)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            {auth.user._id === tour.userId._id ?
                                <ManageUserJoin listUser={[tour.userId, ...tour.joinIds]} updateJoin={updateJoin} tourId={tour._id} title={"Thành viên tham gia"} handleClose={() => setOpenJoin(false)} /> :
                                <UserList listUser={[tour.userId, ...tour.joinIds]} title={"Thành viên tham gia"} handleClose={() => setOpenJoin(false)} />
                            }

                        </Modal>
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
                    <IconButton onClick={() => (setShowCmt(value => !value))}>
                        <QuestionAnswer />
                    </IconButton>
                    <Typography className={classes.numCmt}>
                        {tour.comments.length}
                    </Typography>
                    <IconButton>
                        <Share onClick={() => setShare(true)} />
                    </IconButton>
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
                        <SharePost object={tour} type="tour" />
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