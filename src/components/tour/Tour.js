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
    Link,
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
import ImageList from "../imagelist/ImageList";


export default function Tour(props) {

    const [showCmt, setShowCmt] = useState(false);
    const [like, setLike] = useState(props.tour.liked);
    const [numLike, setNumLike] = useState(props.tour.numLike);

    const classes = postStyles({ showCmt });

    const likeHandle = (e) => {
        setLike(!like);
        if (!like) setNumLike(numLike + 1);
        else setNumLike(numLike - 1);

    }

    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={props.tour.user.avarImage} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.userName}>{props.tour.user.lastName + " " + props.tour.user.firstName}</Typography>
                }
            />

            {/* <CardMedia>

                <ImageList imgList={props.tour.imgList} />
            </CardMedia> */}

            <CardContent>
                <Link>
                    <Typography variant="h6" className={classes.title}>
                        {props.tour.tourName}
                    </Typography>
                </Link>
                {/* <Typography>
                    Chi phí: {props.tour.cost}
                </Typography> */}
                <Typography>
                    Thời gian: {props.tour.tourDate.length} ngày
                </Typography>
                {/* <Typography>
                    Địa điểm: {props.tour.location.map((item) => {
                        return (
                            <Link className={classes.location}>{item}</Link>
                        )
                    })}
                </Typography> */}
            </CardContent>

            <CardActions>
                <IconButton onClick={likeHandle}>
                    {
                        like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                    }

                </IconButton>
                <Typography className={classes.numLike}>
                    {props.tour.likeIds.length}
                </Typography>
                <IconButton onClick={(e) => (setShowCmt(!showCmt))}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {props.tour.comment.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>


            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {props.tour.comment.map((cmt, index) => (
                        <Comment comment={cmt} key={index} />
                    ))}
                </div>
            </Collapse>

            <InputComment />

        </Card>
    )
}