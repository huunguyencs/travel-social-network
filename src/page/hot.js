import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";

import FeedHot from "../components/Feed/FeedHot";
import LeftBar from "../components/Leftbar";
import RightBar from "../components/Rightbar";
import SpeedDialButton from "../components/SpeedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";
import Calendar from '../components/Calendar';
import FriendRecommendCard from '../components/Card/FriendRecommend';



export default function HotPage(props) {

    const classes = useStyles();

    const ref = createRef();


    useEffect(() => {
        document.title = "Hot | Triple H";
    }, [])

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={6} sm={10} xs={10}>
                <FeedHot />
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