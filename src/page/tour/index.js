import { Grid } from "@material-ui/core";
import React from "react";

import LeftBar from "../../components/leftbar/LeftBar";
import FeedTour from "../../components/feed/FeedTour";
import RightBar from "../../components/rightbar/RightBar";
import Slider from "../../components/slider/slider";
import useStyles from "../../style";
import { homeMenu } from "../../constant/menu";
import SpeedDialButton from "../../components/speedDialBtn";


export default function TourPage(props) {

    const classes = useStyles();

    // useEffect(() => {
    //     document.title = "Hành trình"
    // }, [])


    return (
        <>

            <Grid container style={{ margin: 0, padding: 0 }}>
                <SpeedDialButton />
                <Grid item md={12} xs={12}>
                    <Slider />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LeftBar menuList={homeMenu} />
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