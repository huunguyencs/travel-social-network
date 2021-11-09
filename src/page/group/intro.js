import { Grid } from "@material-ui/core";
import React from "react";

import LeftBar from "../../components/leftbar/LeftBar";
import Scroll from "../../components/scroll";
import { groupMenu } from "../../constant/menu";
import GroupInfo from "../../components/group/information"
import GIComponent from "../../components/group/intro";
import Menu from "../../components/leftbar/menu";

function GroupIntro() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <GroupInfo />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar >
            <Menu menuList={groupMenu} />
          </LeftBar>
        </Grid>
        <Grid item sm={6}>
          <GIComponent />
        </Grid>
      </Grid>
    </div>
  );
}

export default GroupIntro;
