import { Button, Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";

import MapCard from "../../components/Card/MapCard";
import RatingChart from "../../components/Card/RatingChart";
import WeatherCardGeneral from "../../components/Card/WeatherCard";
import FeedReview from "../../components/Feed/FeedReview";
import { SeeMoreText } from "../../components/SeeMoreText";
import SpeedDialButton from "../../components/SpeedDialBtn";
import { locationStyles } from "../../style";
import customAxios from "../../utils/fetchData";
import { NotFound } from "../404";
import { getPostsLocation } from "../../redux/callApi/postCall";


export default function Location(props) {

    const [location, setLocation] = useState(null);
    const classes = locationStyles();
    const { id } = useParams();
    const [notFound, setNotFound] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [imgIdx, setImgIdx] = useState(0);
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const dispatch = useDispatch();

    const getLocation = async (id) => {
        if (id) {
            setState({
                loading: true,
                error: false
            })
            setNotFound(false);
            await customAxios().get(`/location/${id}`).then(res => {
                setLocation(res.data.location)
                setState({
                    loading: false,
                    error: false
                })
            }).catch(err => {
                if (err.response && err.response.status === 404)
                    setNotFound(true);
                else
                    setState({
                        loading: false,
                        error: true
                    })
            });

        }
    }

    const handleShowImage = () => {
        setShowImg(true);
    }

    const handleCloseImage = () => {
        setShowImg(false);
    }

    const nextImage = () => {
        setImgIdx((imgIdx + 1) % location.images.length)
    }

    const prevImage = () => {
        setImgIdx((imgIdx + location.images.length - 1) % location.images.length)
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

    const tryAgain = () => {
        getLocation(id);
    }

    return (
        <>
            {
                state.loading ?
                    <div className={classes.centerMarginTop}>
                        <CircularProgress color={"inherit"} />
                    </div> :
                    state.error ?
                        <div className={classes.centerMarginTop}>
                            <div>
                                <Button onClick={tryAgain}>Thử lại</Button>
                            </div>
                        </div> :
                        notFound ?
                            <NotFound /> :
                            <Grid container className={classes.container}>
                                {
                                    location &&
                                    <>
                                        <SpeedDialButton />
                                        <Grid item md={12} sm={12} xs={12}>
                                            <div className={classes.fullname}>
                                                <Typography variant="h2" noWrap={false} className={classes.titleFullname}>
                                                    {location.fullname}
                                                </Typography>
                                            </div>
                                            <div className={classes.provinceWrap}>
                                                <>
                                                    <LocationOn className={classes.iconProvince} />
                                                    <Typography className={classes.provinceName} variant="h4" component={Link} to={`/province/${location.province.name}`}>
                                                        {location.province.fullname}
                                                    </Typography>
                                                </>
                                            </div>


                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
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


                                        <Grid item md={6} sm={12} xs={12}>
                                            <div className={classes.map}>
                                                <MapCard position={location.position} zoom={12} name={location.fullname} height={400} />
                                            </div>
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <Card className={classes.imageList}>
                                                <img src={location.images[0]} alt="Loading..." className={classes.image} onClick={handleShowImage} />
                                                {showImg && (
                                                    <Lightbox
                                                        mainSrc={location.images[imgIdx]}
                                                        nextSrc={location.images[(imgIdx + 1) % location.images.length]}
                                                        prevSrc={location.images[(imgIdx + location.images.length - 1) % location.images.length]}
                                                        mainSrcThumbnail={location.images[imgIdx]}
                                                        imageCaption={location.images[imgIdx]}
                                                        nextSrcThumbnail={location.images[(imgIdx + 1) % location.images.length]}
                                                        prevSrcThumbnail={location.images[(imgIdx + location.images.length - 1) % location.images.length]}
                                                        onCloseRequest={handleCloseImage}
                                                        onMoveNextRequest={nextImage}
                                                        onMovePrevRequest={prevImage}
                                                    />
                                                )}
                                            </Card>
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <div style={{ margin: 30 }}>
                                                <RatingChart star={location.star} />
                                            </div>
                                        </Grid>
                                        <Grid item md={6} sm={12} xs={12}>
                                            <div className={classes.review}>
                                                <FeedReview location={location} />
                                            </div>
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
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