import React, { useState } from "react";
import { InputBase, Modal, Backdrop, Fade } from "@material-ui/core";

import Feed from './index';
import Post from '../Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../Forms/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/callApi/postCall";
import { getMorePost } from "../../redux/actions/postAction";



export default function FeedPost(props) {

    const dispatch = useDispatch();

    const { auth, post } = useSelector(state => state);

    const [show, setShow] = useState(false);

    const classes = feedStyles();

    const loadMore = () => {
        if (post.postId && post.postId.length > 0) {
            dispatch(getMorePost({ postId: post.postId }))
        }
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const tryAgain = () => {
        dispatch(getPosts(auth.token));
    }

    const CreatePostRef = React.forwardRef((props, ref) => (
        <CreatePostForm {...props} innerRef={ref} />
    ))
    const ref = React.createRef();


    return (
        <div className={classes.container} style={{ marginTop: 100 }}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <div className={classes.containerText}>
                        <InputBase
                            placeholder="Bạn đang nghĩ gì?..."
                            className={classes.createText}
                            onClick={handleShow}
                            readOnly
                            rows={1}
                            disabled={!auth.user}
                        />
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={show}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={show}>
                            <CreatePostRef ref={ref} handleClose={handleClose} />
                        </Fade>
                    </Modal>

                </div>
                <Feed
                    loadMore={loadMore}
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
            </div>
        </div>
    )
}