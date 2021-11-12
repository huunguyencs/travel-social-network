import React, { useState } from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
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
import ImageList from "../imagelist/ImageList";



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
                    <Typography className={classes.userName}>{props.post.user.userName}</Typography>
                }
                subheader={props.post.time}
            />

            <CardContent>
                {props.post.isPostReview && <Rating name="location-rating" value={props.post.rate} readOnly style={{ marginBottom: 20 }} />}
                <Typography variant="body1" color="#2F3542" component="p">
                    {props.post.content}
                </Typography>
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
                <Typography className={classes.numLike}>
                    {props.post.likes.length}
                </Typography>
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