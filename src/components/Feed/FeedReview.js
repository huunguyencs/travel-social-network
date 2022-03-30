import React, { useState } from "react";
import { Backdrop, Fade, InputBase, Modal } from "@material-ui/core";

import Post from '../Post';
import Feed from './index';
import { feedReviewStyles } from "../../style";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLocation } from "../../redux/callApi/postCall";
import CreateReview from '../Forms/CreateReview'
// import SuccessIcon from "../Icons/Success";


export default function FeedReview(props) {

    const { location } = props;

    const { post, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    // const [fetch, setFetch] = useState(false);

    const handleShow = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const classes = feedReviewStyles();

    const loadMoreReview = () => {
        if (post.hasMore) {
            dispatch(getPostsLocation(location._id, post.page));
        }
    }

    // function handleScroll() {
    //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         setFetch(true);
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, []);

    // useEffect(() => {
    //     if (fetch) {
    //         loadMorePost(location._id, post.page, dispatch, post.hasMore);
    //     }
    // }, [fetch, post.page, dispatch, post.hasMore, location._id])

    const tryAgain = () => {
        if (location) {
            dispatch(getPostsLocation(location._id, post.page))
        }
    }

    const ref = React.createRef();

    const CreateReviewRef = React.forwardRef((props, ref) =>
        <CreateReview innerRef={ref} {...props} />
    )


    return (
            <div style={{minHeight: "153px"}}>
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
                <Feed
                    loadMore={loadMoreReview}
                    loading={post.loading}
                    error={post.error}
                    hasMore={post.hasMore}
                    tryAgain={tryAgain}
                    type = "review"
                >
                    {
                        post.posts.map((post) => (
                            <Post
                                post={post}
                                key={post._id}
                            />
                        ))
                    }
                </Feed>
                {/* <div className={classes.feedContent}>
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
                            <Button onClick={tryAgain}>Thử lại</Button>
                        </div>
                    }

                    {
                        !post.loading && !post.error && !post.hasMore &&
                        <div style={{ textAlign: 'center', marginBlock: 30 }}>
                            <SuccessIcon style={{ margin: 'auto', fontSize: 50 }} />
                            <Typography style={{ margin: 'auto', fontSize: 24 }}>Bạn đã xem hết tin</Typography>
                        </div>
                    }

                </div> */}
            </div>
    )
}