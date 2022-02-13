import React from "react";
import { CircularProgress, Typography, Button } from "@material-ui/core";


import Post from '../Post';
import { feedStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/callApi/postCall";



export default function FeedPostUser(props) {

    const { id } = props;
    const dispatch = useDispatch();

    const { auth, post } = useSelector(state => state);

    const classes = feedStyles();

    const tryAgain = () => {
        if (id && auth.token) {
            dispatch(getUserPost(id, auth.token, 0))
        }
    }

    // const loadMorePost = () => {
    //     dispatch(getUserPost(id, auth.token, post.posts.length))
    // }


    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.feedContent}>
                    {
                        post.loading ?
                            <div className={classes.centerMarginTop}>
                                <CircularProgress color={"inherit"} />
                            </div>
                            : post.error ?
                                <div className={classes.centerMarginTop}>
                                    <div>
                                        <Typography>Có lỗi xảy ra</Typography>
                                        <Button onClick={tryAgain}>Thử lại</Button>
                                    </div>
                                </div> :
                                post.posts.map((post) => (
                                    <Post
                                        post={post}
                                        key={post._id}
                                    />
                                ))
                    }
                </div>
            </div>
        </div>
    )
}