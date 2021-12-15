import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@material-ui/core";

import { commentStyles } from "../../style";
import { SeeMoreText } from "../seeMoreText";
import { timeAgo } from "../../utils/date";
// import { auth } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, unlikeComment } from "../../redux/callApi/commentCall";
import { Link } from "react-router-dom";

export default function Comment(props) {

    const { comment, type, id } = props;

    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(0);

    const classes = commentStyles({ like });

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const likePress = () => {
        if (!auth.user) return;
        if (like) {
            handleUnlike();
        }
        else handleLike();
    }

    const handleLike = () => {
        setLike(true);
        setNumLike(state => state + 1);
        // call api
        dispatch(likeComment(comment._id, auth, type, id));
    }

    const handleUnlike = () => {
        setLike(false);
        setNumLike(state => state - 1);
        // call api
        dispatch(unlikeComment(comment._id, auth, type, id));
    }

    useEffect(() => {
        if (auth.user && comment.likes.find(like => like._id === auth.user._id)) {
            setLike(true);
        }
        setNumLike(comment.likes.length);
    }, [comment.likes, auth.user]);


    return (
        <div className={classes.comment}>
            <div className={classes.avatar}>
                <Avatar
                    src={comment.userId?.avatar}
                    atl="Avatar"
                />
            </div>
            <div className={classes.cmtInfo}>
                <Typography variant="subtitle2" className={classes.userName} component={Link} to={`/profile/${comment.userId?._id}`}>
                    {comment.userId?.fullname}
                </Typography>
                <div className={classes.content}>
                    {/* <Typography variant="body2">
                        {props.comment.content}
                    </Typography> */}
                    <SeeMoreText
                        variant="body2"
                        maxText={100}
                        text={comment.content}
                    />
                </div>
                <div className={classes.cmtSubinfo}>
                    <div className={classes.like}>
                        <Typography className={classes.smallText}>
                            {numLike}
                        </Typography>
                        <Typography className={`${classes.smallText} ${classes.likeBtn}`} onClick={likePress}>Like</Typography>
                    </div>
                    <div className={classes.time}>
                        <Typography className={classes.smallText}>
                            {timeAgo(new Date(comment.createdAt))}
                        </Typography>

                    </div>
                </div>
            </div>
        </div>
    )
}