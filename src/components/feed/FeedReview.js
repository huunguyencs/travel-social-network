import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@material-ui/core";

import Post from '../post/Post';
import { feedStyles } from "../../style";
import customAxios from "../../utils/fetchData";


export default function FeedReview(props) {

    const { id } = props;

    const classes = feedStyles();
    const [reviews, setReviews] = useState([]);
    const [state, setState] = useState({
        loading: false,
        error: false,
    })

    const getMoreReviews = async (id) => {
        setState({
            loading: true,
            error: false
        })
        if (id) {
            await customAxios().get(`/location/${id}/posts`).then(res => {
                setReviews((state) => ([
                    ...state,
                    res.data.posts
                ]))
                setState({
                    loading: false,
                    error: false
                })
            }).catch(err => {
                setState({
                    loading: false,
                    error: true
                })
            })
        }
    }

    useEffect(() => {
        getMoreReviews(id);
    }, [id])

    return (
        <Container>
            <div className={classes.content}>

                <div>
                    {

                        state.loading ?
                            <CircularProgress color={"black"} />

                            : reviews.length === 0 ?
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                                    <Typography>Chưa có review cho địa điểm này</Typography>
                                </div>
                                :
                                reviews.map((post) => (
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