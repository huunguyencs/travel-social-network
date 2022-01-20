import { Grid } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LeftBar from "../../../components/leftbar/LeftBar";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import useStyles from "../../../style";
import { profileMenu, serviceMenu } from "../../../constant/menu";
import FeedTourUser from "../../../components/feed/FeedTourUser";
import ProfileAvatar from "../../../components/Profile/avatar";
import SpeedDialButton from "../../../components/speedDialBtn";
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
      dispatch(getUser(id, () => {
        setNotFound(true);
      }));
    }
  }, [user.user, id, dispatch, setNotFound])

  useEffect(() => {
    if (user.user) {
      dispatch(getUserTour(user.user._id, auth.token))
      // console.log(user.user)
    }
  }, [dispatch, user.user, auth.token])

  const ref = createRef();


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
                {user.user && (
                  <LeftBar menuList={user.user.role === 1 ? serviceMenu : profileMenu} />
                )}
              </Grid>
              <Grid item md={6} sm={10} xs={10}>
                <FeedTourUser id={id} />
              </Grid>
              <Grid item md={3} className={classes.rightbar}>
                <RightBar ref={ref}>
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
