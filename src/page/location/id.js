import { Grid, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import React from "react";
import RatingChart from "../../components/card/RatingChart";
import WeatherCard from "../../components/card/WeatherCard";
import FeedReview from "../../components/feed/FeedReview";

import { locationStyles } from "../../style";


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


export default function Location(props) {

    const classes = locationStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item md={12} className={classes.coverImg}>
                <div className={classes.imgBg}>
                    <div className={classes.coverText}>
                        <Typography variant="h1">
                            Chùa Một Cột
                        </Typography>
                        <Typography variant="h2">
                            <LocationOn style={{ fontSize: "50px", marginRight: "30px" }} />
                            Hà Nội
                        </Typography>
                    </div>
                </div>
            </Grid>
            <Grid item md={3} sm={12}>
                <div className={classes.infoPanel}>
                    <div className={classes.infoHeader}>
                        <Typography variant="h6">
                            Thông tin chung
                        </Typography>
                    </div>
                    <div className={classes.infoContent}>
                        <Typography>
                            Ninh Bình là tỉnh có tiềm năng du lịch đa dạng và phong phú với nh. Địa danh này nằm ở vị trí cửa ngõ cực nam của tam giác châu thổ sông Hồng và miền Bắc, nơi có nhiều danh lam thắng cảnh gắn với v
                        </Typography>
                    </div>
                </div>

                <div className={classes.map}>

                </div>
            </Grid>
            <Grid item md={6} sm={12}>
                <div className={classes.review}>

                </div>
                <div className={classes.reviewPosts}>
                    <FeedReview />
                </div>
            </Grid>
            <Grid item md={3}>
                <RatingChart />
                <WeatherCard weather={weather} />
            </Grid>
        </Grid>
    )
}