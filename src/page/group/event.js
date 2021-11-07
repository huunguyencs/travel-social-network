import { Grid } from "@material-ui/core";
import React from "react";

import LeftBar from "../../components/leftbar/LeftBar";
import Scroll from "../../components/scroll";
import { groupMenu } from "../../constant/menu";
import GroupInfo from "../../components/group/information"
import GMComponent from "../../components/group/event";

function GroupEvent() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <GroupInfo />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={3}>
          <LeftBar
            menuList={groupMenu}
          />
        </Grid>
        <Grid item sm={6}>
          <GMComponent />
        </Grid>
      </Grid>
    </div>
  );
}

export default GroupEvent;
