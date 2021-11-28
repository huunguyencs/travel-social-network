import { Grid, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MapCard from "../../components/card/MapCard";
import RatingChart from "../../components/card/RatingChart";
import WeatherCard from "../../components/card/WeatherCard";
// import FeedReview from "../../components/feed/FeedReview";
import { SeeMoreText } from "../../components/seeMoreText";
import SpeedDialButton from "../../components/speedDialBtn";
import { locationStyles } from "../../style";
import customAxios from "../../utils/fetchData";

export default function Location(props) {

    const classes = locationStyles({ imgBg: location?.images[0] });
    const [location, setLocation] = useState(null);
    const { id } = useParams();

    const getLocation = async (id, next) => {
        const res = await customAxios().get(`location/${id}`);
        next(res.data.location);
    }

    useEffect(() => {
        getLocation(id, (location) => {
            setLocation(location)
        })
    }, [id, setLocation])

    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid item md={12}>
                <div
                    className={classes.img}
                    style={{
                        backgroundImage: `url(${location?.images[0]})`,
                    }}
                >
                    <div className={classes.coverText}>
                        <Typography variant="h1" style={{ color: "black" }}>
                            {location?.name}
                        </Typography>
                        <div>
                            <LocationOn style={{ fontSize: "50px", marginRight: "30px", color: "black" }} />
                            <Typography variant="h2" component={Link} to={"/province/1"}>
                                {location?.province.name}
                            </Typography>
                        </div>

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
                        <SeeMoreText maxText={300} text={location?.information} variant="body1" />
                    </div>
                </div>

                <div className={classes.map}>
                    <MapCard location={location?.position} />
                </div>
            </Grid>
            <Grid item md={6} sm={12}>
                <div className={classes.review}>

                </div>
                <div className={classes.reviewPosts}>
                    {/* <FeedReview /> */}
                </div>
            </Grid>
            <Grid item md={3}>
                <RatingChart star={location?.star} />
                <WeatherCard name={location?.weatherName} />

            </Grid>
        </Grid>
    )
}