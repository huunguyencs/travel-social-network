
import React, { useEffect, useState } from "react";

import LeftBar from '../../components/Leftbar';
import { NotFound } from "../404";
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';
import { getVolunteers } from "../../redux/callApi/volunteerCall";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import customAxios from "../../utils/fetchData";
import Volunteer from "../../components/Volunteer/VolunteerDetail";


export default function VolunteerDetail() {


    const {volunteer } = useSelector(state => state);

    const { id } = useParams();
    const [volunteerDetail, setVolunteerDetail] = useState();
    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVolunteers());
    }, [dispatch])

    useEffect(() => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        volunteer.volunteers.forEach(element => {
            if(element._id === id) setVolunteerDetail(element)
        })
        setState({
            loading: false,
            error: false,
            notFound: false,
        })
    },[id, volunteer])

    useEffect(() => {
        if (volunteerDetail && volunteerDetail.name) {
            document.title = volunteerDetail.name;
        }
    }, [volunteerDetail])

    const tryAgain = () => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        volunteer.volunteers.forEach(element => {
            if(element._id === id) setVolunteerDetail(element)
        })
        setState({
            loading: false,
            error: false,
            notFound: false,
        })
    }

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={9} sm={10} xs={10} style={{ padding: 30, backgroundColor: '#fafafa' }}>
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

                                volunteerDetail && <Volunteer volunteer={volunteerDetail} />
                }
            </Grid>
        </Grid>
    )
}