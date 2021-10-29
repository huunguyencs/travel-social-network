import { Grid } from "@material-ui/core";
import React from "react";
import { Accessibility, Explore, Home, SupervisorAccount, Tune } from "@material-ui/icons";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/FeedPost";
import RightBar from "../../components/rightbar/RightBar";
import Scroll from "../../components/scroll";
import Profile_Avatar from "../../components/Profile/avatar";



function   Profile_Posts() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <Profile_Avatar/>
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar
            menuList={[
              {
                name: "Giới Thiệu",
                icon: Home,
                active: false,
              },
              {
                name: "Bài Viết",
                icon: Explore,
                active: true,
              },
              {
                name: "Hành Trình",
                icon: Accessibility,
                active: false,
              },
              {
                name: "Nhóm",
                icon: SupervisorAccount,
                active: false,
              },
              {
                name: "Thay đổi thông tin",
                icon: Tune,
                active: false,
              }
            ]}
          />
        </Grid>
        <Grid item sm={6}>
          <Feed />
        </Grid>
        <Grid item sm={3}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile_Posts;
