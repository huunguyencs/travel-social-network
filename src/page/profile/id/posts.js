import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";

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
import Post from "../../../components/post/Post";
import Calendar from "../../../components/calendar";
import FriendRecommendCard from "../../../components/card/FriendRecommend";



function ProfilePosts() {

  const { id } = useParams();

  // const classes = useStyles();
  const { auth, post } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPost(id, auth.token));
  }, [dispatch, id, auth.token])

  return (
    <div>
      <Scroll showBelow={500} />
      <SpeedDialButton />
      <ProfileAvatar />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar >
            <Menu menuList={profileMenu} />
          </LeftBar>
        </Grid>
        <Grid item sm={6}>
          <div style={{ marginTop: "100px", marginInline: "30px" }}>
            {
              post.loading ?
                <CircularProgress color={"black"} />
                : post.error ?
                  <div>error</div> :
                  post.posts.map((post) => (
                    <Post
                      post={post}
                      key={post._id}
                    />
                  ))
            }
          </div>
        </Grid>
        <Grid item sm={3}>
          <RightBar>
            <Calendar />
            <FriendRecommendCard />
          </RightBar>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePosts;
