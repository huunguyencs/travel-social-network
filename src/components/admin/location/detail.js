import { Grid, Container, Typography, makeStyles } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import MapCard from "../../../components/card/MapCard";
import RatingChart from "../../../components/card/RatingChart";
import WeatherCard from "../../../components/card/WeatherCard";
import FeedReview from "../../../components/feed/FeedReview";
import SpeedDialButton from "../../../components/speedDialBtn";

import { locationStyles } from "../../../style";


const weather = {
    name: "Hà Nội",
    time: "30/10/2021",
    temp: 26,
    describe: "Nắng",
    humidity: 80,
    rain: 60,
    vWind: 2.9,
    visibility: 10,
}
// 21.03586561753796, 105.83362647397051
const location = {
    lat: 21.03586561753796,
    lng: 105.83362647397051,
}


function AdminLocationDetail(props) {
  const classes = locationStyles();
  return (
    <Container className={classes.container} style={{ marginTop: "160px" }}>
      <div className={classes.appBarSpacer} />
      <div>
        
      </div>
    </Container>
  );
}

export default AdminLocationDetail;
