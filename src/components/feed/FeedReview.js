import React from "react";
import { Button, CircularProgress, Container, Typography } from "@material-ui/core";

import Post from '../post/Post';
import { feedStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLocation } from "../../redux/callApi/postCall";


export default function FeedReview(props) {

    const { id } = props;

    const { post } = useSelector(state => state);
    const dispatch = useDispatch();

    const classes = feedStyles();

    const tryAgain = () => {
        if (id) {
            dispatch(getPostsLocation(id))
        }
    }

    return (
        <Container>
            <div className={classes.content}>

                <div>
                    {

                        post.loading ?
                            <CircularProgress color={"inherit"} /> :
                            post.error ?
                                <div className={classes.centerMarginTop}>
                                    <div>
                                        <Typography>Có lỗi xảy ra</Typography>
                                        <Button onClick={tryAgain}>Thử lại</Button>
                                    </div>
                                </div>
                                : post.posts.length === 0 ?
                                    <div className={classes.centerMarginTop} style={{ marginTop: 100 }}>
                                        <Typography>Chưa có review cho địa điểm này</Typography>
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
        </Container>
    )
}