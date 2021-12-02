import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from '../post/Post';
import { feedStyles } from "../../style";


export default function FeedReview(props) {

    const classes = feedStyles();
    const { post } = useSelector(state => state);

    return (
        <Container className={classes.container}>
            <div className={classes.content}>

                <div>
                    {
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