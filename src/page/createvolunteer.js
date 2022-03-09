import React, { useEffect, useState } from "react";
import LeftBar from '../components/Leftbar';
import { NotFound } from './404'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import SpeedDialButton from '../components/SpeedDialBtn';
import { homeMenu } from '../constant/menu';
import { useLocation} from 'react-router-dom';
import customAxios from "../utils/fetchData";
import { useSelector } from "react-redux";
import AddVolunteer from '../components/Volunteer/AddVolunteer';

export default function CreateVolunteer() {

    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })
    const { auth } = useSelector(state => state);
    const [isOwn, setIsOwn] = useState(false);
    const location = useLocation();
    const [volunteer, setVolunteer] = useState(null);
    const id = (new URLSearchParams(location.search)).get("id");
    const [edit, setEdit] = useState(false);
    const getVolunteerDetail = async (id) => {
        setState({
            loading: true,
            error: false,
            notFound: false,
        })
        await customAxios().get(`/volunteer/${id}`).then(res => {
            setVolunteer(res.data.volunteer)
            setEdit(true)
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
        if(id != null) getVolunteerDetail(id);
    }, [id])

    useEffect(() => {
        if (auth.user && volunteer) {
            setIsOwn(volunteer.userId._id === auth.user._id);
        }
    }, [setIsOwn, volunteer, auth]);

    useEffect(() => {
        document.title = "Tạo hoạt động tình nguyện";
    }, [])

    const tryAgain = () => {
        if(id != null) getVolunteerDetail(id);
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
                                (edit && isOwn)? volunteer && <AddVolunteer isUpdate={edit} volunteer={volunteer}/>
                                : <AddVolunteer isUpdate={false} volunteer={null}/>
                }
            </Grid>
        </Grid>
    )
}