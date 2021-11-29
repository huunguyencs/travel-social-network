import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import customAxios from '../../utils/fetchData';
import Post from '../../components/post/Post';
import { CircularProgress } from '@material-ui/core';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const getPost = async () => {
        const res = await customAxios().get(`/post/${id}`)
        setPost(res.data.post);
    }

    useEffect(() => {
        getPost(id);
    }, [id])

    return (
        <div>
            <div style={{ marginTop: "200", display: "block" }}>a</div>
            <div style={{ display: "flex", marginTop: 100, justifyContent: "center", width: "100%" }}>
                {
                    post ?
                        <Post post={post} /> :
                        <CircularProgress />
                }
            </div>
        </div>
    )
}
