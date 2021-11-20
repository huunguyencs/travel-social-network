import React, { useState } from "react";
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
    Link,
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


import Comment from "../comment/Comment";
import { postStyles } from "../../style";
import InputComment from "../input/comment";
import UserList from "../modal/userList";
import { SeeMoreText } from "../seeMoreText";

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


export default function Tour(props) {

    const { tour } = props;

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(tour.liked);
    const [numLike, setNumLike] = useState(tour.numLike);

    const classes = postStyles({ showCmt });

    const likeHandle = (e) => {
        setLike(!like);
        if (!like) setNumLike(numLike + 1);
        else setNumLike(numLike - 1);
    }

    const [showLike, setShowLike] = useState(false);

    const handleOpen = () => {
        setShowLike(true);
    };

    const handleClose = () => {
        setShowLike(false);
    };


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
                    <Typography className={classes.userName}>{tour.userId.fullname}</Typography>
                }
            />

            <CardMedia>

                {tour?.image !== "" && <img src={tour.image} width="100%" alt="Can not load" />}
            </CardMedia>


            <CardContent>
                <Link>
                    <Typography variant="h6" className={classes.title}>
                        {tour.tourName}
                    </Typography>
                </Link>
                <SeeMoreText
                    variant="body1"
                    maxText={6}
                    text={tour.content}
                />
                <Typography style={{ marginTop: 20 }}>
                    Thời gian: {tour.tourDate.length} ngày
                </Typography>
                <div>
                    <Typography>Thành viên tham gia: {tour.taggedIds.length + 1}</Typography>
                </div>
                {/* <Typography>
                    Địa điểm: {props.tour.location.map((item) => {
                        return (
                            <Link className={classes.location}>{item}</Link>
                        )
                    })}
                </Typography> */}

                <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((item) =>
                        <Typography className={classes.hashtag}>{item}</Typography>
                    )}
                </div>

            </CardContent>

            <CardActions>
                <IconButton onClick={likeHandle}>
                    {
                        like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                    }

                </IconButton>
                <Typography className={classes.numLike} onClick={handleOpen}>
                    {tour.likeIds.length}
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
                <IconButton onClick={() => (setShowCmt(value => !value))}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {tour.comment.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>


            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {tour.comment.map((cmt) => (
                        <Comment comment={cmt} key={cmt._id} />
                    ))}
                </div>
            </Collapse>

            <InputComment type="tour" id={tour._id} />

        </Card>
    )
}