import React, { useState } from "react";
import { Container, InputBase, Modal, Backdrop, Fade, CircularProgress, Typography, Button } from "@material-ui/core";


import Post from '../post/Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../forms/createPost";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPost } from "../../redux/callApi/postCall";



export default function FeedPost(props) {

    const { id } = props;
    const dispatch = useDispatch();

    const { auth, post } = useSelector(state => state);

    const [show, setShow] = useState(false);

    const classes = feedStyles();

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const tryAgain = () => {
        if (id) {
            dispatch(getUserPost(id, auth.token))
        }
        else {
            dispatch(getPosts(auth.token));
        }
    }


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
        </Container>
    )
}