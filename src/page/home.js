import { Grid } from "@material-ui/core";
import React from "react";


import LeftBar from "../components/leftbar/LeftBar";
import FeedPost from "../components/feed/FeedPost";
import RightBar from "../components/rightbar/RightBar";
import Slider from "../components/slider/slider";
import useStyles from "../style";
import { homeMenu } from "../constant/menu";
import SpeedDialButton from "../components/speedDialBtn";
import Menu from "../components/leftbar/menu";
import Calendar from '../components/card/CalendarCard';
import FriendRecommendCard from '../components/card/FriendRecommend';



function HomePage() {

  const classes = useStyles();


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
        <FeedPost />
      </Grid>
      <Grid item md={3} sm={0} className={classes.rightbar}>
        <RightBar>
          <Calendar />
          <FriendRecommendCard />
        </RightBar>
      </Grid>
    </Grid>
  );
}

export default HomePage;
