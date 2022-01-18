import { Grid } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";

import LeftBar from "../../../components/leftbar/LeftBar";
// import Feed from "../../../components/feed/FeedPost";
import RightBar from "../../../components/rightbar/RightBar";
import Scroll from "../../../components/scroll";
import ProfileAvatar from "../../../components/Profile/avatar";
import { profileMenu } from "../../../constant/menu";
import SpeedDialButton from "../../../components/speedDialBtn";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Post from "../../../components/post/Post";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";
import { NotFound } from "../../404";
import { getUser } from "../../../redux/callApi/userCall";
import { getUserPost } from "../../../redux/callApi/postCall";
import useStyles from "../../../style";
import FeedPostUser from "../../../components/feed/FeedPostUser";



function ProfilePosts() {

  const { id } = useParams();
  const { auth, user } = useSelector(state => state);
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.user || user.user._id !== id) {
      setNotFound(false);
      dispatch(getUser(id, 0, () => {
        setNotFound(true);
      }));

    }
  }, [user.user, id, dispatch, setNotFound])

  useEffect(() => {
    if (user.user) {
      dispatch(getUserPost(user.user._id, auth.token, 0));
    }

  }, [user.user, auth.token, dispatch])

  const classes = useStyles();

  const ref = createRef();

  return (
    <div>
      {
        notFound ?
          <NotFound /> :
          <>
            <Scroll showBelow={500} />
            <SpeedDialButton />
            <ProfileAvatar user={user.user} />
            <Grid container style={{ margin: 0, padding: 0 }}>
              <Grid item md={3} sm={2} xs={2}>
                <LeftBar menuList={profileMenu} />
              </Grid>
              <Grid item md={6} sm={10} xs={10}>
                <FeedPostUser id={id} />
              </Grid>
              <Grid item sm={3} className={classes.rightbar}>
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

export default ProfilePosts;
