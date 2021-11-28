import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LocationCard from "../../components/card/LocationCard";
import { provinceStyles } from "../../style";
import WeatherCard from "../../components/card/WeatherCard";
import CovidCard from "../../components/card/CovidCard";
import SpeedDialButton from "../../components/speedDialBtn";
import RightBar from "../../components/rightbar/RightBar";
import { Pagination } from "@material-ui/lab";
import ServiceCard from "../../components/card/ServiceCard";
import customAxios from "../../utils/fetchData";
import { SeeMoreText } from "../../components/seeMoreText";
import MapCard from "../../components/card/MapCard";



const listLocation = [
    {
        _id: "1",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test1",
        star: 4,
    },
    {
        _id: "2",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test2",
        star: 4,
    },
    {
        _id: "3",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test3",
        star: 4,
    },
    {
        _id: "4",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test4",
        star: 4,
    },
    {
        _id: "5",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test5",
        star: 4,
    },
    {
        _id: "6",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test6",
        star: 4,
    },
    {
        _id: "7",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test7",
        star: 4,
    },
    {
        _id: "8",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test8",
        star: 4,
    },
    // {
    //     id: "9",
    //     image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
    //     name: "Test7",
    //     star: 4,
    // },
]

const listService = [
    {
        _id: "1",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test1",
        star: 4,
    },
    {
        _id: "2",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test2",
        star: 4,
    },
    {
        _id: "3",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test3",
        star: 4,
    },
    {
        _id: "4",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test4",
        star: 4,
    },
    {
        _id: "5",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test5",
        star: 4,
    },
    {
        _id: "6",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test6",
        star: 4,
    },
    {
        _id: "7",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test7",
        star: 4,
    },
    {
        _id: "8",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test8",
        star: 4,
    },
    {
        _id: "9",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test9",
        star: 4,
    },
]

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

const ITEM_PER_PAGE = 6;


export default function Province(props) {

    const [province, setProvince] = useState(null);
    const [locations, setLocations] = useState([]);
    const [services, setServices] = useState([]);
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
        const res = await customAxios().get(`province/${id}`);
        next(res.data.province);
    }

    useEffect(() => {
        getProvince(id, (province) => {
            setProvince(province);
            setLocations(province.locations);
            setServices(province.services);
        })
    }, [id, setProvince])

    return (
        <Grid container>
            <SpeedDialButton />
            <Grid item md={12}>
                <div
                    style={{
                        backgroundImage: `url(${province?.image})`,
                    }}
                    className={classes.img}
                >
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

                    <div className={classes.map}>
                        <MapCard location={province?.position} />
                    </div>
                </div>
                <div className={classes.locationList}>
                    <div className={classes.title}>
                        <Typography variant="h6">Danh sách địa điểm</Typography>
                    </div>
                    <Grid className={classes.listContainer} container>
                        {locations.slice((pageLoc - 1) * ITEM_PER_PAGE, pageLoc * ITEM_PER_PAGE).map((item) => (
                            <Grid item md={4} sm={6} xs={12} key={item._id}>
                                <LocationCard location={item} />
                            </Grid>
                        ))}

                    </Grid>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(locations.length / ITEM_PER_PAGE)} page={pageLoc} onChange={handleChangeLoc} color="primary" />
                    </div>
                </div>
                <div className={classes.locationList}>
                    <div className={classes.title}>
                        <Typography variant="h6">Danh sách dịch vụ</Typography>
                    </div>
                    <Grid className={classes.listContainer} container>
                        {services.slice((pageSer - 1) * ITEM_PER_PAGE, pageSer * ITEM_PER_PAGE).map((item) => (
                            <Grid item md={4} sm={6} xs={12} key={item._id}>
                                <ServiceCard service={item} />
                            </Grid>
                        ))}

                    </Grid>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(services.length / ITEM_PER_PAGE)} page={pageSer} onChange={handleChangeSer} color="primary" />
                    </div>
                </div>
            </Grid>
            <Grid item md={3}>
                <RightBar>
                    <WeatherCard name={province?.weatherName} />
                    <CovidCard />
                </RightBar>
            </Grid>
        </Grid>
    )
}