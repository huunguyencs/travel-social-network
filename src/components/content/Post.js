import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, ImageList, ImageListItem, InputBase, makeStyles, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorderOutlined, MoreVert, QuestionAnswer, Send, Share } from "@material-ui/icons";
import React, { useState } from "react";

import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: "#EEF6F3",
    },
    likeIcon: {
        color: "#ed4956",
    },
    imageList: {
        margin: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    imageItem: {
        cursor: "pointer"
    },
    numLike: {
        marginRight: 15,
    },
    numCmt: {
        marginRight: 15,
    },
    writeCmt: {
        backgroundColor: "#ededed",
        margin: 20,
        borderRadius: 20,
    },
    writeCmtText: {
        paddingInline: 20,
        width: "92%",
    },
    sendIcon: {

    },
    line: {
        width: "80%",
    },
    listCmt: {
        marginTop: 30,
    },
}))


export default function Post(props) {

    const [showCmt, setShowCmt] = useState(false);

    const [like, setLike] = useState(props.post.liked);

    const [numLike, setNumLike] = useState(props.post.numLike);

    const classes = useStyles({ showCmt });

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
                    <Avatar alt="avatar" src={props.post.user.avatar} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.userName}>{props.post.user.name}</Typography>
                }
                subheader={props.post.time}
            />

            <CardContent>
                <Typography variant="body1" color="#2F3542" component="p">
                    {props.post.content}
                </Typography>
            </CardContent>

            <CardMedia>

                {/* <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="img" /> */}
                <ImageList rowHeight={300} className={classes.imageList} cols={calcCols(props.post.imgList.length)}>
                    {props.post.imgList.map((item) => (
                        <ImageListItem key={item.img} className={classes.imageItem}>
                            <img src={item.img} alt={item.title} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia>

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
                    {props.post.cmts.length}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>

            <Collapse className={classes.cmt} in={showCmt}>
                <hr className={classes.line} />
                <div className={classes.listCmt}>
                    {props.post.cmts.map((cmt) => (
                        <Comment comment={cmt} />
                    ))}
                </div>
            </Collapse>

            <div className={classes.writeCmt}>
                <InputBase
                    placeholder="Viết bình luận ..."
                    className={classes.writeCmtText}
                />
                <IconButton>
                    <Send className={classes.sendIcon} />
                </IconButton>

            </div>

        </Card>
    )
}