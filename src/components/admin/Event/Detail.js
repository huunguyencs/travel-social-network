import { CircularProgress, IconButton, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import FormEventAdmin from "./Form";
import { NotFound } from '../../../page/404'
import customAxios from "../../../utils/fetchData";

export default function AminEventDetail() {

    const { subpage } = useParams();

    const [event, setEvent] = useState(null);
    const [state, setState] = useState({
        notFound: false,
        loading: false,
        error: false,
    });



    const getEvent = async (id) => {
        setState({
            notFound: false,
            loading: true,
            error: false
        })
        await customAxios().get(`/event/${id}`).then(res => {
            setEvent(res.data.event);
            setState({
                notFound: false,
                loading: false,
                error: false
            })
        }).catch(err => {
            setState({
                notFound: false,
                loading: false,
                error: true
            })
        })
    }

    useEffect(() => {
        getEvent(subpage);
    }, [subpage])



    return (
        <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
            <IconButton component={Link} to={`/admin/event`} title="Quay lại">
                <ArrowBack />
            </IconButton>
            {
                state.notFound ?
                    <NotFound /> :
                    state.loading ?
                        <div>
                            <CircularProgress />
                        </div> :
                        state.error ?
                            <div></div> :
                            event && <FormEventAdmin event={event} setEvent={setEvent} mode='edit' />
            }
        </Paper>
    )
}
