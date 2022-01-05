import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Container, Typography } from '@material-ui/core';

import Post from '../../components/post/Post';
import { NotFound } from '../404';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../redux/callApi/postCall';


export default function PostDetail() {
    const { id } = useParams();
    const { post } = useSelector(state => state);
    const dispatch = useDispatch();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getPostById(id, () => {
                setNotFound(true);
            }))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (post.posts?.length > 0 && post.posts[0]?.userId) {
            document.title = "Bài viết của " + post.posts[0].userId.fullname;
        }
    }, [post.posts])

    const tryAgain = () => {
        if (id) {
            dispatch(getPostById(id, () => {
                setNotFound(true);
            }))
        }
    }

    return (
        <>

            {
                notFound ? <NotFound /> :
                    <div>
                        <Container style={{ height: "100vh" }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ paddingTop: 100, width: "70%" }}>
                                    {
                                        post.loading ?
                                            <CircularProgress /> :
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
