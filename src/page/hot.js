import { Grid } from "@material-ui/core";
import React from "react";
import FeedHot from "../components/feed/FeedHot";
import LeftBar from "../components/leftbar/LeftBar";
import RightBar from "../components/rightbar/RightBar";
import SpeedDialButton from "../components/speedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";


export default function HotPage(props) {

    const classes = useStyles();

    return (
        <Grid container style={{ margin: 0, padding: 0 }}>
            <SpeedDialButton />
            {/* <Grid item md={12} >
                <Slider />
            </Grid> */}
            <Grid item md={3} sm={12}>
                <LeftBar menuList={homeMenu} />
            </Grid>
            <Grid item md={6}>
                <FeedHot />
            </Grid>
            <Grid item md={3} sm={0} className={classes.rightbar}>
                <RightBar />
            </Grid>
        </Grid>
    )
}