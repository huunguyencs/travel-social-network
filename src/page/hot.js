import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import FeedHot from "../components/feed/FeedHot";
import LeftBar from "../components/leftbar/LeftBar";
import Menu from "../components/leftbar/menu";
import RightBar from "../components/rightbar/RightBar";
import SpeedDialButton from "../components/speedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";
import Calendar from '../components/calendar';
import FriendRecommendCard from '../components/card/FriendRecommend';
import Slider from "../components/slider/slider";


export default function HotPage(props) {

    const classes = useStyles();

    useEffect(() => {
        document.title = "Hot";
    }, [])

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={12} >
                <Slider />
            </Grid>
            <Grid item md={3} sm={12}>
                <LeftBar >
                    <Menu menuList={homeMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={6}>
                <FeedHot />
            </Grid>
            <Grid item md={3} sm={0} className={classes.rightbar}>
                <RightBar>
                    <Calendar />
                    <FriendRecommendCard />
                </RightBar>
            </Grid>
        </Grid>
    )
}