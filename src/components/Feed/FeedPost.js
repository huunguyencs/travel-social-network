import React, { useState } from "react";
import { InputBase, Modal, Backdrop, Fade, CircularProgress, Typography, Button } from "@material-ui/core";


import Post from '../Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../Forms/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/callApi/postCall";



export default function FeedPost(props) {

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
        dispatch(getPosts(auth.token));
    }

    const CreatePostRef = React.forwardRef((props, ref) => (
        <CreatePostForm {...props} innerRef={ref} />
    ))
    const ref = React.createRef();


    return (
        <div className={classes.container}>
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