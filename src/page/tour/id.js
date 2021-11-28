import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'

import Tour from "../../components/tour/TourDetail";
import { getTourDetail } from '../../redux/callApi/tourCall';

export default function TourDetail(props) {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [tour, setTour] = useState();

    useEffect(() => {
        dispatch(getTourDetail(id, (tour) => {
            setTour(tour);
        }));
    }, [dispatch, id, setTour])


    return (
        <Tour tour={tour} />
    )
}