import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, ImageList, ImageListItem, InputBase, makeStyles, Typography } from "@material-ui/core";
import { Favorite, MoreVert, QuestionAnswer, Send, Share } from "@material-ui/icons";
import React from "react";

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
        cursor: "pointer",
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

    }
}))


export default function Post(props) {


    const classes = useStyles();
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
            <CardMedia>

                {/* <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="img" /> */}
                <ImageList rowHeight={300} className={classes.imageList} gap={1}>
                    {props.post.imgList.map((item) => (
                        <ImageListItem key={item.img} className={classes.imageItem}>
                            <img src={item.img} alt={item.title} />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="#2F3542" component="p">
                    {props.post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Favorite className={classes.likeIcon} />
                </IconButton>
                <Typography className={classes.numLike}>
                    {props.post.numLike}
                </Typography>
                <IconButton>
                    <QuestionAnswer />
                </IconButton>
                <Typography className={classes.numCmt}>
                    {props.post.numCmt}
                </Typography>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>
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