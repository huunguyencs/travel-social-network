import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Container, Fade, InputBase, Modal, Typography } from "@material-ui/core";

import Post from '../Post';
import { feedStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLocation } from "../../redux/callApi/postCall";
import CreateReview from '../Forms/CreateReview'
import SuccessIcon from "../Icons/Success";


export default function FeedReview(props) {

    const { location } = props;

    const { post, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [fetch, setFetch] = useState(false);

    const handleShow = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const classes = feedStyles();

    const loadMorePost = (id, page, dispatch, hasMore) => {
        if (hasMore) {
            dispatch(getPostsLocation(id, page));
        }
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setFetch(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    useEffect(() => {
        if (fetch) {
            loadMorePost(location._id, post.page, dispatch, post.hasMore);
        }
    }, [fetch, post.page, dispatch, post.hasMore, location._id])

    const tryAgain = () => {
        if (location) {
            dispatch(getPostsLocation(location._id, 0))
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

                        !post.error && (
                            post.posts.length === 0 ?
                                <div className={classes.centerMarginTop} style={{ marginTop: 100 }}>
                                    <Typography>Chưa có review cho địa điểm này</Typography>
                                </div> :
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
                            <div>
                                <Typography>Có lỗi xảy ra</Typography>
                                <Button onClick={tryAgain}>Thử lại</Button>
                            </div>
                        </div>
                    }

                    {
                        !post.loading && !post.error && !post.hasMore &&
                        <div style={{ textAlign: 'center', marginBlock: 30 }}>
                            <SuccessIcon style={{ margin: 'auto', fontSize: 50 }} />
                            <Typography style={{ margin: 'auto', fontSize: 24 }}>Bạn đã xem hết tin</Typography>
                        </div>
                    }

                </div>
            </div>
        </Container>
    )
}