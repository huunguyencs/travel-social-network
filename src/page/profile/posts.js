import { Grid } from "@material-ui/core";
import React from "react";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/FeedPost";
import RightBar from "../../components/rightbar/RightBar";
import Scroll from "../../components/scroll";
import ProfileAvatar from "../../components/Profile/avatar";
import { profileMenu } from "../../constant/menu";



function ProfilePosts() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <ProfileAvatar />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar
            menuList={profileMenu}
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

export default ProfilePosts;
