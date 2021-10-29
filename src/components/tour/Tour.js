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
    ImageList,
    ImageListItem,
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

    const calcCols = (length) => {
        // if (length % 3 === 0) return 3;
        if (length > 1) return 2;
        return 1;
    }

    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src={props.tour.user.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.userName}>{props.tour.user.name}</Typography>
                }
            />

            <CardMedia>

                <ImageList rowHeight={500} className={classes.imageList} cols={calcCols(props.tour.imgList.length)}>
                    {props.tour.imgList.map((item) => (
                        <ImageListItem key={item.img} className={classes.imageItem}>
                            <img src={item.img} alt={item.title} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia>

            <CardContent>
                <Link>
                    <Typography variant="h6" className={classes.title}>
                        {props.tour.title}
                    </Typography>
                </Link>
                <Typography>
                    Chi phí: {props.tour.cost}
                </Typography>
                <Typography>
                    Thời gian: {props.tour.time}
                </Typography>
                <Typography>
                    Địa điểm: {props.tour.location.map((item) => {
                        return (
                            <Link className={classes.location}>{item}</Link>
                        )
                    })}
                </Typography>
            </CardContent>

            <CardActions>
                <IconButton onClick={likeHandle}>
                    {
                        like ? <Favorite className={classes.likeIcon} /> : <FavoriteBorderOutlined />
                    }

                </IconButton>
                <Typography className={classes.numLike}>
                    {numLike}
                </Typography>
                <IconButton onClick={(e) => (setShowCmt(!showCmt))}>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {props.tour.cmts.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>


            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {props.tour.cmts.map((cmt) => (
                        <Comment comment={cmt} />
                    ))}
                </div>
            </Collapse>

            <InputComment />

        </Card>
    )
}