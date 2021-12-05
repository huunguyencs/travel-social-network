import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LeftBar from "../../../components/leftbar/LeftBar";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import useStyles from "../../../style";
import { profileMenu } from "../../../constant/menu";
import FeedTour from "../../../components/feed/FeedTour";
import ProfileAvatar from "../../../components/Profile/avatar";
import SpeedDialButton from "../../../components/speedDialBtn";
import Menu from "../../../components/leftbar/menu";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import { getUserTour } from "../../../redux/callApi/tourCall";




function ProfileTours() {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  useEffect(() => {
    dispatch(getUserTour(id, auth.token));
  }, [dispatch, id, auth.token])

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
          <RightBar>
            <Calendar />
            <FriendRecommendCard />
          </RightBar>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileTours;
