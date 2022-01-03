import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from '@material-ui/core';

import Tour from "../../components/tour/TourDetail";
import customAxios from "../../utils/fetchData";
import { NotFound } from "../404";

export default function TourDetail(props) {

    const { id } = useParams();
    const [tour, setTour] = useState();
    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })

    useEffect(() => {
        if (tour && tour.name) {
            document.title = tour.name;
        }
    }, [tour])


    const getTourDetail = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`tour/${id}`).then(res => {
            setTour(res.data.tour);
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
        getTourDetail(id);
    }, [id])


    return (
        <>
            {
                state.loading ?
                    <CircularProgress />
                    : state.error ?
                        state.notFound ?
                            <NotFound /> :
                            <Typography onClick={() => getTourDetail(id)}>Có lỗi vui lòng thử lại</Typography>
                        : <Tour tour={tour} />
            }
        </>
    )
}