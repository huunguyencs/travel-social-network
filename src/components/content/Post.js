import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, ImageList, ImageListItem, makeStyles, Typography } from "@material-ui/core";
import { Favorite, MoreVert, QuestionAnswer, Share } from "@material-ui/icons";
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
    }
}))


export default function Post(props) {
    const classes = useStyles();
    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                avatar={
                    <Avatar alt="avatar" src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography className={classes.userName}>Trần Văn A</Typography>
                }
                subheader="October 26, 2021"
            />
            <CardMedia>
                {/* <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="img" /> */}
                <ImageList rowHeight={200} className={classes.imageList} gap={1}>
                    <ImageListItem className={classes.imageItem}>
                        <img src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="img" />
                    </ImageListItem>
                    <ImageListItem className={classes.imageItem}>
                        <img src="http://media.hanoitimes.vn/2021/03/02/DANANG_CAU_RONG.jpg" alt="img" />
                    </ImageListItem>
                    <ImageListItem className={classes.imageItem}>
                        <img src="https://static.dalaco.travel/intranet/images/thoi-gian-cau-rong-phun-lua-da-nang.jpg" alt="img" />
                    </ImageListItem>
                </ImageList>
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="#2F3542" component="p">
                    Đây là một bài post. Tôi đang nghĩ gì đó....
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Favorite className={classes.likeIcon} />
                </IconButton>
                <IconButton>
                    <QuestionAnswer />
                </IconButton>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    )
}