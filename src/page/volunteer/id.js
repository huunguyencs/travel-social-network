
import React, { useEffect, useState } from "react";

import LeftBar from '../../components/Leftbar';
import { NotFound } from "../404";
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';


import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import customAxios from "../../utils/fetchData";
import Volunteer from "../../components/Volunteer/VolunteerDetail";


export default function VolunteerDetail() {


    const { auth } = useSelector(state => state);

    const { id } = useParams();
    const [volunteer, setVolunteer] = useState();
    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })

    const [isOwn, setIsOwn] = useState(false);
    const getVolunteerDetail = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`/volunteer/${id}`).then(res => {
            setVolunteer(res.data.volunteer)
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
        getVolunteerDetail(id);
    }, [id])

    useEffect(() => {
        if (volunteer && volunteer.name) {
            document.title = volunteer.name;
        }
    }, [volunteer])

    useEffect(() => {
        if (auth.user && volunteer) {
            setIsOwn(volunteer.userId._id === auth.user._id);
        }
    }, [setIsOwn, volunteer, auth]);

    const tryAgain = () => {
        getVolunteerDetail(id);
    }

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10} style={{ padding: 30 }}>
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

                                volunteer && <Volunteer volunteer={volunteer} isOwn={isOwn} />
                }
            </Grid>
        </Grid>
    )
}