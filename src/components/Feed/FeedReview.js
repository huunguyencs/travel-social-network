import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, Container, Fade, InputBase, Modal, Typography } from "@material-ui/core";

import Post from '../Post';
import { feedStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLocation } from "../../redux/callApi/postCall";
import CreateReview from '../Forms/CreateReview'


export default function FeedReview(props) {

    const { location } = props;

    const { post, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const classes = feedStyles();

    const tryAgain = () => {
        if (location) {
            dispatch(getPostsLocation(location._id))
        }
    }

    const ref = React.createRef();

    const CreateReviewRef = React.forwardRef((props, ref) =>
        <CreateReview innerRef={ref} {...props} />
    )


    return (
        <Container>
            <div className={classes.content}>
                <div className={classes.create}>
                    <div className={classes.containerText}>
                        <InputBase
                            placeholder="Viết review..."
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
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <CreateReviewRef ref={ref} handleClose={handleClose} location={location} />
                        </Fade>
                    </Modal>

                </div>
                <div className={classes.feedContent}>
                    {
                        post.loading ?
                            <div className={classes.centerMarginTop}>
                                <CircularProgress color={"inherit"} /> </div> :
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