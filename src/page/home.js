import { Grid } from "@material-ui/core";
import React from "react";
import { Accessibility, Explore, Home, SupervisorAccount, Tune } from "@material-ui/icons";


import Header from "../components/header/Header";
import LeftBar from "../components/leftbar/LeftBar";
import FeedPost from "../components/feed/FeedPost";
import RightBar from "../components/rightbar/RightBar";
import Scroll from "../components/scroll";
import Slider from "../components/slider/slider";
import useStyles from "../style";



function HomePage() {

  const classes = useStyles();

  return (
    <>
      <Scroll showBelow={500} />
      <Header />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item md={12} >
          <Slider />
        </Grid>
        <Grid item md={3} sm={12}>
          <LeftBar
            menuList={[
              {
                name: "Trang chủ",
                icon: Home,
                active: true,
              },
              {
                name: "Hành trình",
                icon: Explore,
                active: false,
              },
              {
                name: "Dịch vụ",
                icon: Accessibility,
                active: false,
              },
              {
                name: "Bạn bè",
                icon: SupervisorAccount,
                active: false,
              },
              {
                name: "Cài đặt",
                icon: Tune,
                active: false,
              }
            ]}
          />
        </Grid>
        <Grid item md={6}>
          <FeedPost />
        </Grid>
        <Grid item md={3} sm={0} className={classes.rightbar}>
          <RightBar />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
