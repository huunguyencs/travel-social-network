import React, { useState } from "react";
import { Avatar, Typography } from "@material-ui/core";

import { commentStyles } from "../../style";

export default function Comment(props) {

    const [like, setLike] = useState(props.comment.liked);
    const [numLike, setNumLike] = useState(props.comment.numLike);

    const classes = commentStyles({ like });

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