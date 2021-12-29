import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
// import Feed from "../../../components/feed/FeedPost";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import ProfileAvatar from "../../../components/Profile/avatar";
import { profileMenu } from "../../../constant/menu";
import SpeedDialButton from "../../../components/speedDialBtn";
import Menu from "../../../components/leftbar/menu";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPost } from "../../../redux/callApi/postCall";
// import Post from "../../../components/post/Post";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import FeedPost from "../../../components/feed/FeedPost";
import { NotFound } from "../../404";
import { getUser } from "../../../redux/callApi/userCall";



function ProfilePosts() {

  const { id } = useParams();
  const { auth, user } = useSelector(state => state);
  const [notFound, setNotFound] = useState(false);

  // const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.user || user.user._id !== id) {
      setNotFound(false);
      dispatch(getUser(id, auth.user, () => {
        setNotFound(true);
      }));
    }
  }, [user.user, id, dispatch, auth, setNotFound])

  useEffect(() => {
    dispatch(getUserPost(id, auth.token));
  }, [dispatch, id, auth.token])



  return (
    <div>
      {
        notFound ?
          <NotFound /> :
          <><Scroll showBelow={500} />
            <SpeedDialButton />
            <ProfileAvatar user={user.user} />
            <Grid container style={{ margin: 0, padding: 0 }}>
              <Grid item sm={3}>
                <LeftBar >
                  <Menu menuList={profileMenu} />
                </LeftBar>
              </Grid>
              <Grid item sm={6}>
                <FeedPost />
              </Grid>
              <Grid item sm={3}>
                <RightBar>
                  <Calendar />
                  <FriendRecommendCard />
                </RightBar>
              </Grid>
            </Grid></>}
    </div>
  );
}

export default ProfilePosts;
