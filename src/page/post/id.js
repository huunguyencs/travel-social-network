import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Container, Typography } from '@material-ui/core';

import customAxios from '../../utils/fetchData';
import Post from '../../components/post/Post';
import { NotFound } from '../404';


export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [state, setState] = useState({
        loading: false,
        error: false,
        notFound: false
    });

    const getPost = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`/post/${id}`).then(res => {
            setPost(res.data.post);
            setState({
                loading: false,
                error: false,
                notFound: false,
            })
        }).catch(err => {
            if (err.response.status === 404)
                setState({
                    loading: false,
                    error: true,
                    notFound: true,
                })
            else setState({
                loading: false,
                error: true,
                notFound: false,
            })
        })

    }


    useEffect(() => {
        getPost(id);
    }, [id])

    useEffect(() => {
        if (post?.userId.fullname) {
            document.title = "Bài viết của " + post.userId.fullname;
        }
    }, [post])

    return (
        <>

            {
                state.notFound ? <NotFound /> :
                    <div>
                        <Container style={{ height: "100vh" }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ paddingTop: 100, width: "70%" }}>
                                    {
                                        state.loading ?
                                            <CircularProgress /> :
                                            state.error ?
                                                <Typography onClick={() => getPost(id)}>Có lỗi vui lòng thử lại</Typography>
                                                : <Post post={post} />

                                    }
                                </div>
                            </div>
                        </Container>
                    </div>}
        </>
    )
}
