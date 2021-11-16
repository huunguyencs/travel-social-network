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

import Comment from "../comment/Comment";
import InputComment from "../input/comment";
import { postStyles } from "../../style";
import ImageList from "../imageModal/ImageList";
import { Link } from "react-router-dom";
import UserList from "../modalList/userList";
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



export default function Post(props) {

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(props.post.liked);
    const [numLike, setNumLike] = useState(props.post.numLike);

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


    const handleShowCmt = () => {
        setShowCmt(!showCmt)
    }

    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={props.post.user.avatarImage} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Link to={"/profile/" + props.post.user._id} >
                        <Typography className={classes.userName}>{props.post.user.lastName + " " + props.post.user.firstName}</Typography>
                    </Link>
                }
                subheader={props.post.time}
            />

            <CardContent>
                {props.post.isPostReview && <Rating name="location-rating" value={props.post.rate} readOnly style={{ marginBottom: 20 }} />}
                <SeeMoreText
                    variant="body1"
                    maxText={6}
                    text={props.post.content}
                />
                <div className={classes.hashtagWrap}>
                    {props.post.hashtags.map((item) =>
                        <Typography className={classes.hashtag}>{item}</Typography>
                    )}
                </div>
            </CardContent>

            <CardMedia>

                {/* <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="img" /> */}
                <ImageList imgList={props.post.postImages} />
            </CardMedia>

            <CardActions>
                <IconButton onClick={likeHandle}>
                    {
                        like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                    }

                </IconButton>
                <Typography className={classes.numLike} onClick={handleOpen}>
                    {props.post.likes.length}
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
                <IconButton onClick={handleShowCmt}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {props.post.comments.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>

            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {props.post.comments.map((cmt) => (
                        <Comment comment={cmt} />
                    ))}
                </div>
            </Collapse>

            <InputComment />

        </Card>
    )
}