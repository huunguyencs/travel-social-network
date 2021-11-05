import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";
import Scroll from "../../components/scroll";
import useStyles from "../../style";
import { profileMenu } from "../../constant/menu";
import FeedTour from "../../components/feed/FeedTour";
import ProfileAvatar from "../../components/Profile/avatar";


function ProfileTours() {
    const classes = useStyles();
  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <ProfileAvatar />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item md={3} sm={12} xs={12}>
            <LeftBar menuList={profileMenu} />
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
