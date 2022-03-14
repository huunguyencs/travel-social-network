import React from "react";


import Post from '../Post';
import Feed from './index';
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/callApi/postCall";



export default function FeedPostUser(props) {

    const { id } = props;
    const dispatch = useDispatch();

    const { post } = useSelector(state => state);


    const tryAgain = () => {
        if (id) {
            dispatch(getUserPost(id, post.page))
        }
    }

    const loadPost = () => {
        if (post.hasMore) {
            dispatch(getUserPost(id, post.page))
        }
    }

    return (
        <Feed
            loadMore={loadPost}
            tryAgain={tryAgain}
            loading={post.loading}
            error={post.error}
            hasMore={post.hasMore}
        >
            {post.posts.map((post) => (
                <Post
                    post={post}
                    key={post._id}
                />
            ))}
        </Feed>
    )
}