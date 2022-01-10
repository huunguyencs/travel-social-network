import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from '@material-ui/core';

import Tour from "../../components/tour/TourDetail";
import customAxios from "../../utils/fetchData";
import { NotFound } from "../404";
import { useDispatch, useSelector } from "react-redux";
import { loadTour } from "../../redux/actions/createTourAction";
import AddTour from "../../components/tour/AddTour";

export default function TourDetail(props) {

    const location = useLocation();

    const edit = (new URLSearchParams(location.search)).get("edit");

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const { id } = useParams();
    const [tour, setTour] = useState();
    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })

    const [isOwn, setIsOwn] = useState(false);

    useEffect(() => {
        if (tour && tour.name) {
            document.title = tour.name;
        }
    }, [tour])

    useEffect(() => {
        if (auth.user && tour) {
            setIsOwn(tour.userId._id === auth.user._id);
        }
    }, [setIsOwn, tour, auth]);


    const getTourDetail = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`/tour/${id}`).then(res => {
            setTour(res.data.tour);
            setState({
                loading: false,
                error: false,
                notFound: false,
            })
        }).catch(err => {
            if (err?.response.status === 404)
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

    useEffect(() => {
        if (edit === 'true' && tour) {
            dispatch(loadTour({ tour: tour }));
        }
    }, [edit, tour, dispatch])


    return (
        <>
            {
                state.loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                        <CircularProgress />
                    </div>
                    : state.error ?
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                            <>
                                <Typography>Có lỗi xảy ra</Typography>
                                <Button onClick={() => getTourDetail(id)}>Thử lại</Button>
                            </>
                        </div> :
                        state.notFound ?
                            <NotFound /> :
                            tour && (edit === 'true' && isOwn ? <AddTour isUpdate={true} /> : <Tour tour={tour} isOwn={isOwn} />)
            }
        </>
    )
}