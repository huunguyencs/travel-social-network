import { Grid, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import MapCard from "../../components/card/MapCard";
import RatingChart from "../../components/card/RatingChart";
import WeatherCardGeneral from "../../components/card/WeatherCard";
import FeedReview from "../../components/feed/FeedReview";
import { SeeMoreText } from "../../components/seeMoreText";
import SpeedDialButton from "../../components/speedDialBtn";
import { locationStyles } from "../../style";
import customAxios from "../../utils/fetchData";
import { getPostsLocation } from "../../redux/callApi/postCall";

export default function Location(props) {

    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const classes = locationStyles();
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

    useEffect(() => {
        if (id) {
            dispatch(getPostsLocation(id));
        }
    }, [id, dispatch])

    return (
        <Grid container className={classes.container}>
            {
                location &&
                <>
                    <SpeedDialButton />
                    <Grid item md={12}>
                        <div
                            className={classes.img}
                        >
                            <img src={location?.images[0]} alt={"Location"} style={{ width: "100%", height: "650px" }} />
                            <div className={classes.coverText}>
                                <Typography variant="h1" className={classes.name}>
                                    {location.fullname}
                                </Typography>
                                <div>
                                    <LocationOn className={classes.iconProvince} />
                                    <Typography className={classes.provinceName} variant="h2" component={Link} to={`/province/${location.province.name}`}>
                                        {location.province.fullname}
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
                                <SeeMoreText maxText={300} text={location.information} variant="body1" />
                            </div>
                        </div>

                        <div className={classes.map}>
                            <MapCard position={location.position} zoom={12} name={location.name} />
                        </div>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <div className={classes.review}>
                            <FeedReview />
                        </div>
                        <div className={classes.reviewPosts}>

                        </div>
                    </Grid>
                    <Grid item md={3}>
                        <RatingChart star={location.star} />
                        <WeatherCardGeneral position={location.position} nameShow={location.name} />

                    </Grid>
                </>
            }
        </Grid>
    )
}