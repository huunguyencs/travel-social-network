import React, { useState } from "react";
import { Avatar, Typography } from "@material-ui/core";

import { commentStyles } from "../../style";
import { SeeMoreText } from "../seeMoreText";
import { timeAgo } from "../../utils/date";

export default function Comment(props) {

    const { comment } = props;

    const [like, setLike] = useState(comment.liked);
    const [numLike, setNumLike] = useState(comment.numLike);

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
                    src={comment.userId.avatar}
                    atl="Avatar"
                />
            </div>
            <div className={classes.cmtInfo}>
                <Typography variant="subtitle2" className={classes.userName}>
                    {comment.userId.fullname}
                </Typography>
                <div className={classes.content}>
                    {/* <Typography variant="body2">
                        {props.comment.content}
                    </Typography> */}
                    <SeeMoreText
                        variant="body2"
                        maxText={10}
                        text={comment.content}
                    />
                </div>
                <div className={classes.cmtSubinfo}>
                    <div className={classes.like}>
                        <Typography className={classes.smallText}>
                            {comment.likes.length}
                        </Typography>
                        <Typography className={`${classes.smallText} ${classes.likeBtn}`} onClick={likeHandle}>Like</Typography>
                    </div>
                    <div className={classes.time}>
                        <Typography className={classes.smallText}>
                            {timeAgo(new Date(comment.updatedAt))}
                        </Typography>

                    </div>
                </div>
            </div>
        </div>
    )
}