import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import { NotFound } from "../../404";
import { getUser } from "../../../redux/callApi/userCall";
import { getUserTour } from "../../../redux/callApi/tourCall";




function ProfileTours() {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, user } = useSelector(state => state);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user.user || user.user._id !== id) {
      setNotFound(false);
      dispatch(getUser(id, auth.user, () => {
        setNotFound(true);
      }));
    }
  }, [user.user, id, dispatch, auth, setNotFound])

  useEffect(() => {
    if (user.user) {
      dispatch(getUserTour(user.user._id, auth.token))
    }
  }, [dispatch, user.user, auth.token])


  return (
    <div>
      {
        notFound ?
          <NotFound /> :
          <><Scroll showBelow={500} />
            <SpeedDialButton />
            <ProfileAvatar user={user.user} />
            <Grid container style={{ margin: 0, padding: 0 }}>
              <Grid item md={3} sm={2} xs={2}>
                <LeftBar >
                  <Menu menuList={profileMenu} />
                </LeftBar>
              </Grid>
              <Grid item md={6} sm={10} xs={10}>
                <FeedTour id={id} />
              </Grid>
              <Grid item md={3} className={classes.rightbar}>
                <RightBar>
                  <Calendar />
                  <FriendRecommendCard />
                </RightBar>
              </Grid>
            </Grid>
          </>
      }
    </div>
  );
}

export default ProfileTours;
