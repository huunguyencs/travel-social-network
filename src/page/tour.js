import { Grid } from "@material-ui/core";
import React from "react";
import { Accessibility, Explore, Home, SupervisorAccount, Tune } from "@material-ui/icons";

import Header from "../components/header/Header";
import LeftBar from "../components/leftbar/LeftBar";
import FeedTour from "../components/feed/FeedTour";
import RightBar from "../components/rightbar/RightBar";
import Scroll from "../components/scroll";
import Slider from "../components/slider/slider";
import useStyles from "../style";


export default function TourPage(props) {

    const classes = useStyles();


    return (
        <>
            <Scroll showBelow={500} />
            <Header />
            <Grid container style={{ margin: 0, padding: 0 }}>
                <Grid item md={12} xs={12}>
                    <Slider />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LeftBar
                        menuList={[
                            {
                                name: "Trang chủ",
                                icon: Home,
                                active: false,
                                path: "",
                            },
                            {
                                name: "Hành trình",
                                icon: Explore,
                                active: true,
                                path: "",
                            },
                            {
                                name: "Dịch vụ",
                                icon: Accessibility,
                                active: false,
                                path: "",
                            },
                            {
                                name: "Bạn bè",
                                icon: SupervisorAccount,
                                active: false,
                                path: "",
                            },
                            {
                                name: "Cài đặt",
                                icon: Tune,
                                active: false,
                                path: "",
                            }
                        ]}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <FeedTour />
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                    <RightBar />
                </Grid>
            </Grid>
        </>
    )
}