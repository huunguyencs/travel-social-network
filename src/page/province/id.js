import { Button, Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LocationCard from "../../components/card/LocationCard";
import { provinceStyles } from "../../style";
import WeatherCardGeneral from "../../components/card/WeatherCard";
import CovidCard from "../../components/card/CovidCard";
import SpeedDialButton from "../../components/speedDialBtn";
import RightBar from "../../components/rightbar/RightBar";
import { Pagination } from "@material-ui/lab";
import ServiceCard from "../../components/card/ServiceCard";
import customAxios from "../../utils/fetchData";
import MapCard from "../../components/card/MapCard";
import { NotFound } from "../404";
import EventCard from "../../components/card/EventCard";


const ITEM_PER_PAGE = 6;


export default function Province(props) {

    const [province, setProvince] = useState(null);
    const [locations, setLocations] = useState(null);
    const [services, setServices] = useState(null);
    const [events, setEvents] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams();
    const [state, setState] = useState({
        loading: false,
        error: false,
    })

    const [stateLocation, setStateLocation] = useState({
        loading: false,
        error: false
    })
    const [stateEvent, setStateEvent] = useState({
        loading: false,
        error: false
    })
    const [stateService, setStateService] = useState({
        loading: false,
        error: false
    })

    const [pageLoc, setPageLoc] = useState(1);
    const [pageSer, setPageSer] = useState(1);

    const handleChangeLoc = (e, value) => {
        setPageLoc(value);
    }

    const handleChangeSer = (e, value) => {
        setPageSer(value);
    }

    const classes = provinceStyles();

    const getProvince = async (id) => {
        if (id) {
            setState({
                loading: true,
                error: false
            })
            setNotFound(false);
            await customAxios().get(`/province/${id}`).then(res => {
                setProvince(res.data.province, res.data.locations, res.data.services, res.data.events);
                setState({
                    loading: false,
                    error: false,
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

    const getLocation = async (id) => {
        if (id) {
            setStateLocation({
                loading: true,
                error: false,
            })
            await customAxios().get(`/province/location/${id}`).then(res => {
                setLocations(res.data.locations)
                setStateLocation({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                setStateLocation({
                    loading: false,
                    error: true
                })
            })
        }
    }

    const getEvent = async (id) => {
        if (id) {
            setStateEvent({
                loading: true,
                error: false,
            })
            await customAxios().get(`/province/event/${id}`).then(res => {
                setEvents(res.data.events)
                setStateEvent({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                setStateEvent({
                    loading: false,
                    error: true
                })
            })
        }
    }

    const getService = async (id) => {
        if (id) {
            setStateService({
                loading: true,
                error: false,
            })
            await customAxios().get(`/province/service/${id}`).then(res => {
                setServices(res.data.services)
                setStateService({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                setStateService({
                    loading: false,
                    error: true
                })
            })
        }
    }

    const tryAgain = () => {
        if (id) {
            getProvince(id);
        }
    }

    useEffect(() => {
        if (id) {
            getProvince(id);
        }

    }, [id]);

    useEffect(() => {
        if (province) {
            getLocation(province._id);

            getEvent(province._id)

            getService(province._id)
        }
    }, [province])

    useEffect(() => {
        if (province && province.fullname) {
            document.title = province.fullname;
        }
    }, [province])

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
                                <Typography>Có lỗi xảy ra</Typography>
                                <Button onClick={tryAgain}>Thử lại</Button>
                            </div>
                        </div> :
                        notFound ?
                            <NotFound /> :
                            <Grid container>
                                {
                                    province && <>
                                        <SpeedDialButton />
                                        <Grid item md={12}>
                                            <div
                                                className={classes.img}
                                            >
                                                <img src={province.image} alt="Province" className={classes.image} />
                                                <Typography className={classes.provinceName} variant="h1">
                                                    {province.fullname}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item md={9}>
                                            <Card className={classes.desContainer}>
                                                <div className={classes.title}>
                                                    <Typography variant="h5">Thông tin về {province.fullname}</Typography>
                                                </div>
                                                <div className={classes.desContent}>
                                                    <Typography>
                                                        {province.information}
                                                    </Typography>
                                                    <div className={classes.detail}>
                                                        <div>
                                                            <Typography variant="h5">I. Tổng quan</Typography>
                                                            <div>
                                                                <div className={classes.subtitleDes}>
                                                                    <Typography variant="h6"> 1. Văn hóa</Typography>
                                                                    <Typography className={classes.subsubtitleDes} component="p">{province.detail.overview.cultural}</Typography>
                                                                </div>
                                                                <div className={classes.subtitleDes}>
                                                                    <Typography variant="h6"> 2. Địa lý</Typography>
                                                                    <Typography className={classes.subsubtitleDes} component="p">{province.detail.overview.geography}</Typography>
                                                                </div>
                                                                <div className={classes.subtitleDes}>
                                                                    <Typography variant="h6"> 3. Thời tiết</Typography>
                                                                    <Typography className={classes.subsubtitleDes} component="p">{province.detail.overview.weather}</Typography>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Typography variant="h5">II. Phương tiện</Typography>
                                                            <ul className={classes.ul}>
                                                                <li className={classes.subsubtitleDes}>
                                                                    Sân bay: {province.detail.vehicle.airport}
                                                                </li>
                                                                <li className={classes.subsubtitleDes}>
                                                                    Phương tiện di chuyển: {province.detail.vehicle.traffic}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <Typography variant="h5">III. Ẩm thực</Typography>
                                                            <ul className={classes.ul}>
                                                                {province.detail.food.map((item, index) => (
                                                                    <li className={classes.subsubtitleDes} key={index}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={classes.source}>
                                                    <i>Nguồn: Internet</i>
                                                </div>
                                            </Card>
                                            <div className={classes.map}>
                                                <MapCard position={province.position} zoom={10} locations={locations} />
                                            </div>
                                            <div className={classes.locationList}>
                                                <div className={classes.title}>
                                                    <Typography variant="h6">Danh sách địa điểm</Typography>
                                                </div>
                                                {
                                                    stateLocation.loading ?
                                                        <div className={classes.centerMarginTop}>
                                                            <CircularProgress color="inherit" />
                                                        </div> :
                                                        stateLocation.error ?
                                                            <div className={classes.centerMarginTop}>
                                                                <Button onClick={() => getLocation(province._id)}>Thử lại</Button>
                                                            </div> :
                                                            locations &&
                                                            <>
                                                                <Grid className={classes.listContainer} container>
                                                                    {locations.slice((pageLoc - 1) * ITEM_PER_PAGE, pageLoc * ITEM_PER_PAGE).map((item) => (
                                                                        <Grid item md={4} sm={6} xs={12} key={item._id}>
                                                                            <LocationCard location={item} />
                                                                        </Grid>
                                                                    ))}

                                                                </Grid>
                                                                <div className={classes.patination}>
                                                                    <Pagination count={Math.ceil(locations.length / ITEM_PER_PAGE)} page={pageLoc} onChange={handleChangeLoc} color="primary" />
                                                                </div>
                                                            </>
                                                }
                                            </div>
                                            <div className={classes.locationList}>
                                                <div className={classes.title}>
                                                    <Typography variant="h6">Danh sách lễ hội</Typography>
                                                </div>
                                                {
                                                    stateEvent.loading ?
                                                        <div className={classes.centerMarginTop}>
                                                            <CircularProgress color="inherit" />
                                                        </div> :
                                                        stateEvent.error ?
                                                            <div className={classes.centerMarginTop}>
                                                                <Button onClick={() => getEvent(province._id)}>Thử lại</Button>
                                                            </div> :
                                                            events &&
                                                            <>
                                                                <Grid className={classes.listContainer} container>
                                                                    {events?.slice((pageSer - 1) * ITEM_PER_PAGE, pageSer * ITEM_PER_PAGE).map((item) => (
                                                                        <Grid item md={4} sm={6} xs={12} key={item._id}>
                                                                            <EventCard event={item} />
                                                                        </Grid>
                                                                    ))}

                                                                </Grid>
                                                                <div className={classes.patination}>
                                                                    <Pagination count={Math.ceil(events.length / ITEM_PER_PAGE)} page={pageSer} onChange={handleChangeSer} color="primary" />
                                                                </div>
                                                            </>
                                                }

                                            </div>
                                            <div className={classes.locationList}>
                                                <div className={classes.title}>
                                                    <Typography variant="h6">Danh sách dịch vụ</Typography>
                                                </div>
                                                {
                                                    stateService.loading ?
                                                        <div className={classes.centerMarginTop}>
                                                            <CircularProgress color="inherit" />
                                                        </div> :
                                                        stateService.error ?
                                                            <div className={classes.centerMarginTop}>
                                                                <Button onClick={() => getService(province._id)}>Thử lại</Button>
                                                            </div> :
                                                            services &&
                                                            <>
                                                                <Grid className={classes.listContainer} container>
                                                                    {services?.slice((pageSer - 1) * ITEM_PER_PAGE, pageSer * ITEM_PER_PAGE).map((item) => (
                                                                        <Grid item md={4} sm={6} xs={12} key={item._id}>
                                                                            <ServiceCard service={item} />
                                                                        </Grid>
                                                                    ))}

                                                                </Grid>
                                                                <div className={classes.patination}>
                                                                    <Pagination count={Math.ceil(services.length / ITEM_PER_PAGE)} page={pageSer} onChange={handleChangeSer} color="primary" />
                                                                </div>
                                                            </>
                                                }

                                            </div>
                                        </Grid>
                                        <Grid item md={3}>
                                            <RightBar>
                                                <WeatherCardGeneral position={province?.position} nameShow={province?.fullname} />
                                                <CovidCard name={province?.fullname} />
                                            </RightBar>
                                        </Grid>
                                    </>
                                }

                            </Grid>
            }
        </>
    )
}