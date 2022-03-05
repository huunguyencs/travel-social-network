import React, { useEffect, useState } from "react";
import { CircularProgress, Button } from "@material-ui/core";


import Post from '../Post';
import { feedStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/callApi/postCall";



export default function FeedPostUser(props) {

    const { id } = props;
    const dispatch = useDispatch();

    const { post } = useSelector(state => state);

    const [fetch, setFetch] = useState(false);

    const classes = feedStyles();

    const tryAgain = () => {
        if (id) {
            dispatch(getUserPost(id, 0))
        }
    }

    const loadPost = (id, page, hasMore, dispatch) => {
        if (hasMore) {
            dispatch(getUserPost(id, page))
        }
        setFetch(false);
    }

    useEffect(() => {
        if (fetch) {
            loadPost(id, post.page, post.hasMore, dispatch)
        }
    }, [id, fetch, post.page, post.hasMore, dispatch])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }


    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.feedContent}>
                    {

                        !post.error && (
                            post.posts.map((post) => (
                                <Post
                                    post={post}
                                    key={post._id}
                                />
                            ))
                        )
                    }
                    {
                        post.loading &&
                        <div className={classes.centerMarginTop}>
                            <CircularProgress color={"inherit"} />
                        </div>
                    }
                    {
                        post.error &&
                        <div className={classes.centerMarginTop}>
                            <Button onClick={tryAgain}>Thử lại</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}