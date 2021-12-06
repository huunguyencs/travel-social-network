import { Grid, Typography } from "@material-ui/core";
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
import { SeeMoreText } from "../../components/seeMoreText";
import MapCard from "../../components/card/MapCard";


const ITEM_PER_PAGE = 6;


export default function Province(props) {

    const [province, setProvince] = useState(null);
    const [locations, setLocations] = useState(null);
    const [services, setServices] = useState(null);
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
            const res = await customAxios().get(`/province/${id}`);
            next(res.data.province, res.data.locations, res.data.services);
        }

    }

    useEffect(() => {
        if (id) {
            getProvince(id, (province, locations, services) => {
                setProvince(province);
                setLocations(locations);
                setServices(services);
            });
        }

    }, [id, setProvince, setLocations, setServices]);

    return (
        <Grid container>
            {
                province &&
                <>
                    <SpeedDialButton />
                    <Grid item md={12}>
                        <div
                            className={classes.img}
                        >
                            <img src={province?.image} alt="Province" style={{ width: "100%", height: "700px" }} />
                            <Typography className={classes.provinceName} variant="h1">
                                {province?.name}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item md={9}>
                        <div className={classes.desContainer}>
                            <div className={classes.title}>
                                <Typography variant="h5">Thông tin chung</Typography>
                            </div>
                            <Typography className={classes.desContent}>
                                <SeeMoreText maxText={300} text={province?.information} variant="body1" />
                            </Typography>


                        </div>
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
                            <WeatherCardGeneral position={province?.position} nameShow={province?.name} />
                            <CovidCard name={province?.name} />
                        </RightBar>
                    </Grid>
                </>
            }

        </Grid>
    )
}