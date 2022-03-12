import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import LeftBar from "../../components/Leftbar";
import FeedTour from "../../components/Feed/FeedTour";
import RightBar from "../../components/Rightbar";
import useStyles from "../../style";
import { homeMenu } from "../../constant/menu";
import SpeedDialButton from "../../components/SpeedDialBtn";
import Calendar from '../../components/Calendar';
import FriendRecommendCard from '../../components/Card/FriendRecommend';
import { getTours } from "../../redux/callApi/tourCall";


export default function TourPage(props) {

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTours());
    }, [dispatch])

    useEffect(() => {
        document.title = "Hành trình | Triple H";
    }, [])

    const ref = createRef();


    return (
        <>
            <Grid container style={{ margin: 0, padding: 0 }}>
                <SpeedDialButton />
                <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
                    <LeftBar menuList={homeMenu} />
                </Grid>
                <Grid item md={6} sm={10} xs={10} className={classes.content}>
                    <FeedTour />
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                    <RightBar ref={ref}>
                        <Calendar />
                        <FriendRecommendCard />
                    </RightBar>
                </Grid>
            </Grid>
        </>
    )
}