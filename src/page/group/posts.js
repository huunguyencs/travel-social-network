import { Grid } from "@material-ui/core";
import React from "react";

import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/FeedPost";
import Scroll from "../../components/scroll";
import { groupMenu } from "../../constant/menu";
import GroupInfo from "../../components/group/information"
import SpeedDialButton from "../../components/speedDialBtn";

function GroupPost() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <SpeedDialButton />
      <GroupInfo />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar
            menuList={groupMenu}
          />
        </Grid>
        <Grid item sm={6}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
}

export default GroupPost;
