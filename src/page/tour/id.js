import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";

import Tour from "../../components/Tour/TourDetail";
import customAxios from "../../utils/fetchData";
import { NotFound } from "../404";
import { loadTour } from "../../redux/actions/createTourAction";
import AddTour from "../../components/Tour/AddTour";
import { sortTourDate } from "../../utils/utils";

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
            setIsOwn(tour.joinIds.includes(auth.user._id));
        }
    }, [setIsOwn, tour, auth]);


    const getTourDetail = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`/tour/${id}`).then(res => {
            setTour(sortTourDate(res.data.tour));
            setState({
                loading: false,
                error: false,
                notFound: false,
            })
        }).catch(err => {
            if (err && err.response && err.response.status === 404)
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

    const tryAgain = () => {
        getTourDetail(id);
    }

    // useEffect(() => {
    //     console.log(tour)
    // }, [tour])


    return (
        <>
            {
                state.notFound ?
                    <NotFound /> :
                    state.loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                            <CircularProgress color="inherit" />
                        </div>
                        : state.error ?
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}>
                                <>
                                    <Typography>Có lỗi xảy ra</Typography>
                                    <Button onClick={tryAgain}>Thử lại</Button>
                                </>
                            </div> :

                            tour && (edit === 'true' && isOwn ? <AddTour isUpdate={true} /> : <Tour tour={tour} setTour={setTour} isOwn={isOwn} />)
            }
        </>
    )
}