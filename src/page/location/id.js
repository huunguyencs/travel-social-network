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


    const [location, setLocation] = useState(null);
    const classes = locationStyles({ image: location?.images[0] });
    const { id } = useParams();

    const getLocation = async (id) => {
        if (id) {
            const res = await customAxios().get(`/location/${id}`);
            setLocation(res.data.location);
        }
    }

    useEffect(() => {
        if (id) {
            getLocation(id);
        }

    }, [id])

    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid item md={12}>
                <div
                    className={classes.img}
                    style={{
                        backgroundImage: `url(https://3.bp.blogspot.com/-MYz47-CD_ig/Whw2P_O0m6I/AAAAAAABP8Y/piWDhHo0BA0S77PYhXh8OVPf64kezZ-6ACKgBGAs/s1600/dao-ly-son-o-dau-2.jpg)`,
                    }}
                >
                    <div className={classes.coverText}>
                        <Typography variant="h1" style={{ color: "black" }}>
                            {location?.name}
                        </Typography>
                        <div>
                            <LocationOn style={{ fontSize: "50px", marginRight: "30px", color: "black" }} />
                            <Typography variant="h2" component={Link} to={`/province/${location?.province._id}`}>
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
                    <MapCard position={location?.position} zoom={12} />
                </div>
            </Grid>
            <Grid item md={6} sm={12}>
                <div className={classes.review}>

                </div>
                <div className={classes.reviewPosts}>

                </div>
            </Grid>
            <Grid item md={3}>
                <RatingChart star={location?.star} starTotal={location?.starTotal} />
                <WeatherCard name={location?.weatherName} nameShow={location?.name} />

            </Grid>
        </Grid>
    )
}