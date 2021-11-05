import { Grid } from "@material-ui/core";
import React from "react";


import LeftBar from "../components/leftbar/LeftBar";
import FeedPost from "../components/feed/FeedPost";
import RightBar from "../components/rightbar/RightBar";
import Slider from "../components/slider/slider";
import useStyles from "../style";
import { homeMenu } from "../constant/menu";



function HomePage() {

  const classes = useStyles();

  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <Grid item md={12} >
        <Slider />
      </Grid>
      <Grid item md={3} sm={12}>
        <LeftBar menuList={homeMenu} />
      </Grid>
      <Grid item md={6}>
        <FeedPost />
      </Grid>
      <Grid item md={3} sm={0} className={classes.rightbar}>
        <RightBar />
      </Grid>
    </Grid>
  );
}

export default HomePage;
