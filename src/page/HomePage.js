import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/header/Header";
import LeftBar from "../components/leftbar/LeftBar";
import Feed from "../components/content/Feed";
import RightBar from "../components/rightbar/RightBar";
import Scroll from "../components/scroll";

const useStyles = makeStyles((theme) => ({
  coverImg: {
    width: "100%",
  },
  cover: {
    backgroundImage: `url(https://freenice.net/wp-content/uploads/2021/08/Hinh-anh-thien-nhien-dep.jpg)`,
    height: theme.spacing(120),
    textAlign: "center",
    color: "white",
  },
  title: {
    paddingTop: theme.spacing(40),
    fontWeight: 500,
  }
}))

function HomePage() {

  const classes = useStyles();

  return (
    <div>
      <Scroll showBelow={500} />
      <Header />
      <Grid container style={{ margin: 0, padding: 0 }}>
        <Grid item sm={12} className={classes.cover}>
          <Typography variant="h1" className={classes.title}>GOGO</Typography>
          <Typography variant="h2">It's travel time</Typography>
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
