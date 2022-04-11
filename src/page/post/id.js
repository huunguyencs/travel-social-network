import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Container, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../../components/Post';
import { NotFound } from '../404';
import { getPostById } from '../../redux/callApi/postCall';
import { postStyles } from '../../style';


export default function PostDetail() {
    const { id } = useParams();
    const { post, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getPostById(id, auth.token, () => {
                setNotFound(true);
            }))
        }
    }, [id, dispatch, auth.token])

    useEffect(() => {
        if (post.posts?.length > 0 && post.posts[0]?.userId) {
            document.title = "Bài viết của " + post.posts[0].userId.fullname;
        }
    }, [post.posts])

    const tryAgain = () => {
        if (id) {
            dispatch(getPostById(id, auth.token, () => {
                setNotFound(true);
            }))
        }
    }

    const classes = postStyles();

    return (
        <>
            {
                notFound ? <NotFound /> :
                    <div>
                        <Container>
                            <div className={classes.center}>
                                <div className={classes.contentWrap}>
                                    {
                                        post.loading ?
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
                                                <CircularProgress />
                                            </div> :
                                            post.error ?
                                                <Typography onClick={tryAgain}>Có lỗi vui lòng thử lại</Typography>
                                                : <Post post={post.posts[0]} />

                                    }
                                </div>
                            </div>
                        </Container>
                    </div>}
        </>
    )
}
