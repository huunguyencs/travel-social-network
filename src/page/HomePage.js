import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../components/header/Header";
import LeftBar from "../components/leftbar/LeftBar";
import Feed from "../components/content/Feed";
import RightBar from "../components/rightbar/RightBar";
import Scroll from "../components/scroll";
import Slider from "../components/slider/slider";


function HomePage() {

  // const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={12} >
          {/* <Typography variant="h1" className={classes.title}>GOGO</Typography>
          <Typography variant="h2">It's travel time</Typography> */}
          <Slider />
        </Grid>
        <Grid item sm={3}>
          <LeftBar />
        </Grid>
        <Grid item sm={6}>
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
