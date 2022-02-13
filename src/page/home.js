import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import LeftBar from "../components/Leftbar";
import FeedPost from "../components/Feed/FeedPost";
import RightBar from "../components/Rightbar";
import Slider from "../components/Slider";
import useStyles from "../style";
import { homeMenu } from "../constant/menu";
import SpeedDialButton from "../components/SpeedDialBtn";
import Calendar from '../components/Calendar';
import FriendRecommendCard from '../components/Card/FriendRecommend';
import { getPosts } from "../redux/callApi/postCall";



function HomePage() {

  const classes = useStyles();

  const ref = createRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  useEffect(() => {
    document.title = "GOGO";
  }, [])


  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      <Grid item md={12} sm={12} xs={12}>
        <Slider />
      </Grid>
      <Grid item md={3} sm={2} xs={2} className={classes.leftbar}>
        <LeftBar menuList={homeMenu} />
      </Grid>
      <Grid item md={6} sm={10} xs={10} className={classes.content}>
        <FeedPost />
      </Grid>
      <Grid item md={3} className={classes.rightbar}>
        <RightBar ref={ref}>
          <Calendar />
          <FriendRecommendCard />
        </RightBar>
      </Grid>
    </Grid>
  );
}

export default HomePage;
