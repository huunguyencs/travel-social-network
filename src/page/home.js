import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import LeftBar from "../components/leftbar/LeftBar";
import FeedPost from "../components/feed/FeedPost";
import RightBar from "../components/rightbar/RightBar";
import Slider from "../components/slider/slider";
import useStyles from "../style";
import { homeMenu } from "../constant/menu";
import SpeedDialButton from "../components/speedDialBtn";
import Menu from "../components/leftbar/menu";
import Calendar from '../components/calendar';
import FriendRecommendCard from '../components/card/FriendRecommend';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/callApi/postCall";



function HomePage() {

  const classes = useStyles();

  const { auth } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    document.title = "GOGO";
  })


  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      <Grid item md={12} >
        <Slider />
      </Grid>
      <Grid item md={3} sm={12} xs={12} className={classes.leftbar}>
        <LeftBar >
          <Menu menuList={homeMenu} />
        </LeftBar>
      </Grid>
      <Grid item md={6} sm={12} xs={12} className={classes.content}>
        <FeedPost />
      </Grid>
      <Grid item md={3} className={classes.rightbar}>
        <RightBar>
          <Calendar />
          <FriendRecommendCard />
        </RightBar>
      </Grid>
    </Grid>
  );
}

export default HomePage;
