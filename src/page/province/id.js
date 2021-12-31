import { Card, Grid, Typography } from "@material-ui/core";
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

    const [pageLoc, setPageLoc] = useState(1);
    const [pageSer, setPageSer] = useState(1);

    const handleChangeLoc = (e, value) => {
        setPageLoc(value);
    }

    const handleChangeSer = (e, value) => {
        setPageSer(value);
    }

    const classes = provinceStyles();

    const getProvince = async (id, next) => {
        if (id) {
            setNotFound(false);
            await customAxios().get(`/province/${id}`).then(res => {
                next(res.data.province, res.data.locations, res.data.services, res.data.events);
            }).catch(err => {
                if (err.response.status === 404)
                    setNotFound(true);
            });
        }

    }

    useEffect(() => {
        if (id) {
            getProvince(id, (province, locations, services, events) => {
                setProvince(province);
                setLocations(locations);
                setServices(services);
                setEvents(events);
            });
        }

    }, [id, setProvince, setLocations, setServices]);

    useEffect(() => {
        if (province && province.fullname) {
            document.title = province.fullname;
        }
    }, [province])

    return (
        <>
            {
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
                                        <img src={province?.image} alt="Province" style={{ width: "100%", height: "700px" }} />
                                        <Typography className={classes.provinceName} variant="h1">
                                            {province?.fullname}
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
                                                        <div style={{ marginLeft: 10 }}>
                                                            <Typography variant="h6"> 1. Văn hóa</Typography>
                                                            <Typography style={{ marginLeft: 30 }} component="p">{province.detail.overview.cultural}</Typography>
                                                        </div>
                                                        <div style={{ marginLeft: 10 }}>
                                                            <Typography variant="h6"> 2. Địa lý</Typography>
                                                            <Typography style={{ marginLeft: 30 }} component="p">{province.detail.overview.geography}</Typography>
                                                        </div>
                                                        <div style={{ marginLeft: 10 }}>
                                                            <Typography variant="h6"> 3. Thời tiết</Typography>
                                                            <Typography style={{ marginLeft: 30 }} component="p">{province.detail.overview.weather}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Typography variant="h5">II. Phương tiện</Typography>
                                                    <ul tyle={{ marginLeft: 10, listStyleType: 'disc' }}>
                                                        <li style={{ marginLeft: 30 }}>
                                                            Sân bay: {province.detail.vehicle.airport}
                                                        </li>
                                                        <li style={{ marginLeft: 30 }}>
                                                            Phương tiện di chuyển: {province.detail.vehicle.traffic}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <Typography variant="h5">III. Ẩm thực</Typography>
                                                    <ul style={{ marginLeft: 10, listStyleType: 'disc' }}>
                                                        {province.detail.food.map(item => (
                                                            <li style={{ marginLeft: 30 }}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: "right", marginRight: 30, marginBottom: 30 }}>
                                            <i>Nguồn: Internet</i>
                                        </div>
                                    </Card>
                                    <div className={classes.map}>
                                        <MapCard position={province?.position} zoom={9} />
                                    </div>
                                    <div className={classes.locationList}>
                                        <div className={classes.title}>
                                            <Typography variant="h6">Danh sách địa điểm</Typography>
                                        </div>
                                        {
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