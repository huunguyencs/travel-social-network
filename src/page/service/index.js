import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import Calendar from '../../components/calendar';
import FriendRecommendCard from "../../components/card/FriendRecommend";
import FeedService from "../../components/feed/FeedService";
import LeftBar from "../../components/leftbar/LeftBar";
import Menu from "../../components/leftbar/menu";
import RightBar from "../../components/rightbar/RightBar";
// import Slider from "../../components/slider/slider";
import SpeedDialButton from "../../components/speedDialBtn";
import { homeMenu } from "../../constant/menu";
import useStyles from "../../style";

export default function ServicePage(props) {

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
            <Grid item md={3} sm={12}>
                <LeftBar >
                    <Menu menuList={homeMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={6}>
                <FeedService />
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