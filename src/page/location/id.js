import { Card, Grid, Typography } from "@material-ui/core";
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
import { NotFound } from "../404";
import ImageList from "../../components/modal/ImageList";

export default function Location(props) {

    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const classes = locationStyles();
    const { id } = useParams();
    const [notFound, setNotFound] = useState(false);

    const getLocation = async (id) => {
        if (id) {
            console.log(id)
            setNotFound(false);
            await customAxios().get(`/location/${id}`).then(res => {
                console.log(res);
                setLocation(res.data.location)
            }).catch(err => {
                console.log("loi")
                console.log(err);
                // if (err.response.status === 404)
                //     setNotFound(true);
                setNotFound(true);
            });

        }
    }

    useEffect(() => {
        if (id) {
            getLocation(id);
        }
    }, [id])

    useEffect(() => {
        if (location) {
            dispatch(getPostsLocation(location._id));
        }
    }, [location, dispatch])

    useEffect(() => {
        if (location?.fullname) {
            document.title = location.fullname
        }
    }, [location])

    return (
        <>
            {
                notFound ?
                    <NotFound /> :
                    <Grid container className={classes.container}>
                        {
                            location &&
                            <>
                                <SpeedDialButton />
                                <Grid item md={12}>
                                    <div style={{ margin: 'auto', marginTop: 120, display: 'flex', justifyContent: 'center' }}>
                                        <Typography variant="h2" noWrap={false}>
                                            {location.fullname}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                        <>
                                            <LocationOn className={classes.iconProvince} />
                                            <Typography className={classes.provinceName} variant="h4" component={Link} to={`/province/${location.province.name}`}>
                                                {location.province.fullname}
                                            </Typography>
                                        </>
                                    </div>


                                </Grid>
                                <Grid item md={4} sm={12}>
                                    <div className={classes.infoPanel}>
                                        <div className={classes.infoHeader}>
                                            <Typography variant="h6">
                                                Thông tin chung
                                            </Typography>
                                        </div>
                                        <div className={classes.infoContent}>
                                            <SeeMoreText maxText={500} text={location.information} variant="body1" />
                                        </div>
                                    </div>
                                </Grid>


                                <Grid item md={5} sm={12}>
                                    <div className={classes.map}>
                                        <MapCard position={location.position} zoom={12} name={location.fullname} />
                                    </div>
                                </Grid>
                                <Grid item md={3} sm={12}>
                                    <Card className={classes.imageList}>
                                        <ImageList imgList={location.images} show2Image={false} />
                                    </Card>
                                </Grid>
                                <Grid md={3} sm={12}>
                                    <div style={{ margin: 30 }}>
                                        <RatingChart star={location.star} />
                                    </div>
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <div className={classes.review}>
                                        <FeedReview />
                                    </div>
                                </Grid>
                                <Grid item md={3} sm={12}>
                                    <div style={{ margin: 30 }}>
                                        <WeatherCardGeneral position={location.position} nameShow={location.fullname} />
                                    </div>
                                </Grid>
                            </>
                        }
                    </Grid>}
        </>
    )
}