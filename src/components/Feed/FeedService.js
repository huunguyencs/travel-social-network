import { Container } from "@material-ui/core";
import React from "react";
// import { useDispatch } from "react-redux";

import { feedStyles } from "../../style";
// import Post from "../post/Post";



export default function FeedService(props) {

    const classes = feedStyles();

    // const dispatch = useDispatch();
    // const { post } = useSelector(state => state);

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch])

    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                {/* 
                <div>
                    {
                        post.posts.map((service) => (
                            <Post
                                post={service}
                                key={service._id}
                            />
                        ))
                    }
                </div> */}
            </div>
        </Container>
    )
}