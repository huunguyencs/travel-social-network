import { Grid } from '@material-ui/core';
import React, { createRef } from 'react';

import Calendar from '../components/Calendar';
import FriendRecommendCard from '../components/Card/FriendRecommend';
import LeftBar from '../components/Leftbar';
import RightBar from '../components/Rightbar';
import SpeedDialButton from '../components/SpeedDialBtn';
import { homeMenu } from '../constant/menu'
import useStyles from '../style'

export default function Volunteer() {

    const ref = createRef();

    const classes = useStyles();

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={6} sm={10} xs={10}>

            </Grid>
            <Grid item md={3} className={classes.rightbar}>
                <RightBar ref={ref}>
                    <Calendar />
                    <FriendRecommendCard />
                </RightBar>
            </Grid>
        </Grid>
    )
}
