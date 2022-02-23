
import React, { useEffect, useState } from "react";

import LeftBar from '../components/Leftbar';
import { NotFound } from './404'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import SpeedDialButton from '../components/SpeedDialBtn';
import { homeMenu } from '../constant/menu';



import AddVolunteer from '../components/Volunteer/AddVolunteer';

export default function CreateVolunteer() {

    const [state, setState] = useState({
        loading: false,
        notFound: false,
        error: false
    })

    useEffect(() => {
        document.title = "Tạo hoạt động tình nguyện";
    }, [])

    const tryAgain = () => {
        
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
                                <AddVolunteer/>
                }
            </Grid>
        </Grid>
    )
}