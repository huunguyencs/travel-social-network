import React from "react";
import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from '../post/Post';
import { feedStyles } from "../../style";


export default function FeedReview(props) {

    const classes = feedStyles();
    const { post } = useSelector(state => state);

    return (
        <Container>
            <div className={classes.content}>

                <div>
                    {
                        post.posts.length === 0 ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                                <Typography>Chưa có review cho địa điểm này</Typography>
                            </div>
                            :
                            post.loading ?
                                <CircularProgress color={"black"} />
                                :
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