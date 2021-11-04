import { Grid } from "@material-ui/core";
import React from "react";

import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/FeedPost";
import Scroll from "../../components/scroll";
import { groupMenu } from "../../constant/menu";
import {Group_Info} from "../../components/group/information"
import { Group_Menber } from "../../components/group/menber";

function Group() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <Group_Info/>
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar
            menuList={groupMenu}
          />
        </Grid>
        <Grid item sm={6}>
         <Group_Menber/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Group;
