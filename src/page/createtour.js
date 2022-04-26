import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import AddTourDemo from '../components/Tour/AddTourDemo';

export default function CreateTour(props) {

    useEffect(() => {
        document.title = "Tạo tour";
    }, [])

    const { createTour } = useSelector(state => state);
    if (createTour.tour.length === 0) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <AddTourDemo isUpdate={false} />
    )
}