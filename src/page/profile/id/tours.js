import { Grid } from "@material-ui/core";
import React from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import useStyles from "../../../style";
import { profileMenu } from "../../../constant/menu";
import FeedTour from "../../../components/feed/FeedTour";
import ProfileAvatar from "../../../components/Profile/avatar";
import SpeedDialButton from "../../../components/speedDialBtn";
import Menu from "../../../components/leftbar/menu";


function ProfileTours() {
  const classes = useStyles();
  return (
    <div>
      <Scroll showBelow={500} />
      <SpeedDialButton />
      <ProfileAvatar />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item md={3} sm={12} xs={12}>
          <LeftBar >
            <Menu menuList={profileMenu} />
          </LeftBar>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <FeedTour />
        </Grid>
        <Grid item md={3} className={classes.rightbar}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileTours;
