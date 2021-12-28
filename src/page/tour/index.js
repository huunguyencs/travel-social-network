import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import LeftBar from "../../components/leftbar/LeftBar";
import FeedTour from "../../components/feed/FeedTour";
import RightBar from "../../components/rightbar/RightBar";
import Slider from "../../components/slider/slider";
import useStyles from "../../style";
import { homeMenu } from "../../constant/menu";
import SpeedDialButton from "../../components/speedDialBtn";
import Menu from "../../components/leftbar/menu";
import Calendar from '../../components/calendar';
import FriendRecommendCard from '../../components/card/FriendRecommend';
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../../redux/callApi/tourCall";


export default function TourPage(props) {

    const classes = useStyles();

    const { auth } = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            dispatch(getTours(auth.token));
        }

    }, [dispatch, auth.token])

    useEffect(() => {
        document.title = "GOGO";
    }, [])


    return (
        <>

            <Grid container style={{ margin: 0, padding: 0 }}>
                <SpeedDialButton />
                <Grid item md={12} xs={12}>
                    <Slider />
                </Grid>
                <Grid item md={3} sm={12} xs={12} className={classes.leftbar}>
                    <LeftBar >
                        <Menu menuList={homeMenu} />
                    </LeftBar>
                </Grid>
                <Grid item md={6} sm={12} xs={12} className={classes.content}>
                    <FeedTour />
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                    <RightBar>
                        <Calendar />
                        <FriendRecommendCard />
                    </RightBar>
                </Grid>
            </Grid>
        </>
    )
}