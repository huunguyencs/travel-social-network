import { Grid } from '@material-ui/core';
import React from 'react'
import Calendar from '../components/calendar';
import FriendRecommendCard from '../components/card/FriendRecommend';
import LeftBar from '../components/leftbar/LeftBar';
import Menu from '../components/leftbar/menu';
import RightBar from '../components/rightbar/RightBar';
import SpeedDialButton from '../components/speedDialBtn';
import { homeMenu } from '../constant/menu'
import useStyles from '../style'

export default function Volunteer() {

    const classes = useStyles();

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar >
                    <Menu menuList={homeMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={6} sm={10} xs={10}>

            </Grid>
            <Grid item md={3} className={classes.rightbar}>
                <RightBar>
                    <Calendar />
                    <FriendRecommendCard />
                </RightBar>
            </Grid>
        </Grid>
    )
}
