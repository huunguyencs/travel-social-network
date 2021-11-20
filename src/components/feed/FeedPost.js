import React, { useEffect, useState } from "react";
import { Container, InputBase, Modal, Backdrop, Fade, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";


import Post from '../post/Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../forms/createPost";
import { getPosts } from "../../redux/callApi/postCall";



export default function FeedPost(props) {

    const [show, setShow] = useState(false);

    const { post } = useSelector(state => state);
    const dispatch = useDispatch();

    const classes = feedStyles();

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        dispatch(getPosts("post", ""));
    }, [dispatch])


    return (
        <Container className={classes.container}>
            <div className={classes.content}>
                <div className={classes.create}>
                    <div className={classes.containerText}>
                        <InputBase
                            placeholder="Bạn đang nghĩ gì?..."
                            className={classes.createText}
                            onClick={handleShow}
                            readOnly
                            rows={1}
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
                            <CreatePostForm handleClose={handleClose} />
                        </Fade>
                    </Modal>

                </div>


                <div>
                    {
                        post.loading ?
                            <CircularProgress color={"black"} />
                            : post.error ?
                                <div>Có lỗi xảy ra</div> :
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