import React, {useEffect} from "react";
import { useSelector} from "react-redux";
import { Redirect } from "react-router";

import AddTour from '../components/tour/AddTour';

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
        <AddTour />
    )
}