import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../components/header/Header";
import LeftBar from "../components/leftbar/LeftBar";
import Feed from "../components/content/Feed";
import RightBar from "../components/rightbar/RightBar";


function HomePage() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item sm={2}>
          <LeftBar />
        </Grid>
        <Grid item sm={7}>
          <Feed />
        </Grid>
        <Grid item sm={3}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
