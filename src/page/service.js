import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";

import Calendar from '../components/calendar';
import FriendRecommendCard from "../components/card/FriendRecommend";
import FeedService from "../components/feed/FeedService";
import LeftBar from "../components/leftbar/LeftBar";
import RightBar from "../components/rightbar/RightBar";
// import Slider from "../../components/slider/slider";
import SpeedDialButton from "../components/speedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";

export default function ServicePage(props) {

    const ref = createRef();

    const classes = useStyles();

    useEffect(() => {
        document.title = "Dịch vụ | GOGO";
    }, [])

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            {/* <Grid item md={12} >
                <Slider />
            </Grid> */}
            <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={6} sm={10} xs={10}>
                <FeedService />
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