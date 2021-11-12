import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import AddTour from '../components/tour/AddTour';

export default function CreateTour(props) {
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