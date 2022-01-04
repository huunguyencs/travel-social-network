import React, { useEffect, useState } from "react";
import { Container, InputBase, Modal, Backdrop, Fade, CircularProgress, Typography, Button } from "@material-ui/core";


import Post from '../post/Post';
import { feedStyles } from "../../style";
import CreatePostForm from "../forms/createPost";
import customAxios from "../../utils/fetchData";



export default function FeedPost(props) {

    const { id } = props;

    const [show, setShow] = useState(false);

    // const { post } = useSelector(state => state);
    // const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState({
        loading: false,
        error: false,
    });

    const classes = feedStyles();


    const getMorePosts = async (id) => {
        setState({
            loading: true,
            error: false
        });
        try {
            var url = id ? `/post/user_posts/${id}` : `/post/posts`;
            await customAxios().get(url).then(res => {
                setPosts((state) => ([
                    ...state,
                    ...res.data.posts
                ]))
                setState({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                setState({
                    loading: false,
                    error: true
                })
            })
        }
        catch (err) {
            setState({
                loading: false,
                error: true
            })
        }
    }


    useEffect(() => {
        getMorePosts(id);
    }, [id])

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const addPost = (post) => {
        if (post) {
            setPosts((state) => ([
                post,
                ...state
            ]))
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
                            <CreatePostForm handleClose={handleClose} addPost={addPost} />
                        </Fade>
                    </Modal>

                </div>


                <div>
                    {
                        state.loading ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                                <CircularProgress color={"inherit"} />
                            </div>
                            : state.error ?
                                <div style={{ margin: 'auto' }}>
                                    <Typography>Có lỗi xảy ra</Typography>
                                    <Button onClick={getMorePosts}>Thử lại</Button>
                                </div> :
                                posts.map((post) => (
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