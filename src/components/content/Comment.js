import { Avatar, makeStyles, Typography } from "@material-ui/core";
// import { Favorite } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        marginTop: 10,
        marginBottom: 20,
        marginInline: 30,

    },
    avatar: {
        marginRight: 10,
    },
    cmtInfo: {

    },
    content: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    cmtSubinfo: {
        display: "flex",
        marginTop: 5,
    },
    smallText: {
        fontSize: "14px",
    },
    like: {
        marginInline: 10,
        display: "flex",
    },
    time: {
        marginInline: 10,
    },
    likeIcon: {
        fontSize: "15px",
    },
    likeBtn: {
        color: (props) => props.like ? theme.palette.primary.main : "black",
        fontWeight: (props) => props.like ? 600 : 400,
        marginInline: 5,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    userName: {
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    }
}))

export default function Comment(props) {

    const [like, setLike] = useState(props.comment.liked);
    const [numLike, setNumLike] = useState(props.comment.numLike);

    const classes = useStyles({ like });

    const likeHandle = (e) => {
        setLike(!like);
        if (!like) setNumLike(numLike + 1);
        else setNumLike(numLike - 1);
    }

    return (
        <div className={classes.comment}>
            <div className={classes.avatar}>
                <Avatar
                    src={props.comment.user.avatar}
                />
            </div>
            <div className={classes.cmtInfo}>
                <Typography variant="subtitle2" className={classes.userName}>
                    {props.comment.user.name}
                </Typography>
                <div className={classes.content}>
                    <Typography variant="body2">
                        {props.comment.content}
                    </Typography>
                </div>
                <div className={classes.cmtSubinfo}>
                    <div className={classes.like}>
                        <Typography className={classes.smallText}>
                            {numLike}
                        </Typography>
                        <Typography className={[classes.smallText, classes.likeBtn]} onClick={likeHandle}>Like</Typography>
                    </div>
                    <div className={classes.time}>
                        <Typography className={classes.smallText}>
                            {props.comment.time}
                        </Typography>

                    </div>
                </div>
            </div>
        </div>
    )
}