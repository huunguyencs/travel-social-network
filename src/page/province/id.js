import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

import LocationCard from "../../components/card/LocationCard";
import { provinceStyles } from "../../style";
import WeatherCard from "../../components/card/WeatherCard";
import CovidCard from "../../components/card/CovidCard";
import SpeedDialButton from "../../components/speedDialBtn";
import RightBar from "../../components/rightbar/RightBar";
import { Pagination } from "@material-ui/lab";
import ServiceCard from "../../components/card/ServiceCard";


const listLocation = [
    {
        id: "1",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test1",
        star: 4,
    },
    {
        id: "2",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test2",
        star: 4,
    },
    {
        id: "3",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test3",
        star: 4,
    },
    {
        id: "4",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test4",
        star: 4,
    },
    {
        id: "5",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test5",
        star: 4,
    },
    {
        id: "6",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test6",
        star: 4,
    },
    {
        id: "7",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test7",
        star: 4,
    },
    {
        id: "8",
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
        id: "1",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test1",
        star: 4,
    },
    {
        id: "2",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test2",
        star: 4,
    },
    {
        id: "3",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test3",
        star: 4,
    },
    {
        id: "4",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test4",
        star: 4,
    },
    {
        id: "5",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test5",
        star: 4,
    },
    {
        id: "6",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test6",
        star: 4,
    },
    {
        id: "7",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test7",
        star: 4,
    },
    {
        id: "8",
        image: "https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg",
        name: "Test8",
        star: 4,
    },
    {
        id: "9",
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

    const [pageLoc, setPageLoc] = useState(1);
    const [pageSer, setPageSer] = useState(1);

    const handleChangeLoc = (e, value) => {
        setPageLoc(value);
    }

    const handleChangeSer = (e, value) => {
        setPageSer(value);
    }

    const classes = provinceStyles();

    return (
        <Grid container>
            <SpeedDialButton />
            <Grid item md={12}>
                <div
                    style={{
                        backgroundImage: `url(https://recmiennam.com/wp-content/uploads/2020/10/nhung-canh-dep-viet-nam-sao-ma-yeu-den-the-1.jpg)`,
                    }}
                    className={classes.img}
                >
                    <Typography className={classes.provinceName} variant="h1">
                        Hà Nội
                    </Typography>
                </div>
            </Grid>
            <Grid item md={9}>
                <div className={classes.desContainer}>
                    <div className={classes.title}>
                        <Typography variant="h5">Thông tin chung</Typography>
                    </div>
                    <Typography className={classes.desContent}>
                        Ninh Bình nằm ở vị trí ranh giới 3 khu vực địa lý: Tây Bắc, châu thổ sông Hồng và Bắc Trung Bộ. Tỉnh này cũng nằm giữa 3 vùng kinh tế: vùng Hà Nội, vùng duyên hải Bắc Bộ và vùng duyên hải miền Trung. Ninh Bình nằm ở trọng tâm của nửa phía Bắc Việt Nam, khu vực các tỉnh từ Thừa Thiên Huế trở ra.
                    </Typography>
                </div>
                <div className={classes.locationList}>
                    <div className={classes.title}>
                        <Typography variant="h6">Danh sách địa điểm</Typography>
                    </div>
                    <Grid className={classes.listContainer} container>
                        {listLocation.slice((pageLoc - 1) * ITEM_PER_PAGE, pageLoc * ITEM_PER_PAGE).map((item) => (
                            <Grid item md={4} sm={6} xs={12} key={item.id}>
                                <LocationCard location={item} />
                            </Grid>
                        ))}

                    </Grid>
                    <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(listLocation.length / ITEM_PER_PAGE)} page={pageLoc} onChange={handleChangeLoc} color="primary" />
                    </div>
                </div>
                <div className={classes.locationList}>
                    <div className={classes.title}>
                        <Typography variant="h6">Danh sách dịch vụ</Typography>
                    </div>
                    <Grid className={classes.listContainer} container>
                        {listService.slice((pageSer - 1) * ITEM_PER_PAGE, pageSer * ITEM_PER_PAGE).map((item) => (
                            <Grid item md={4} sm={6} xs={12} key={item.id}>
                                <ServiceCard service={item} />
                            </Grid>
                        ))}

                    </Grid>
                    <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(listService.length / ITEM_PER_PAGE)} page={pageSer} onChange={handleChangeSer} color="primary" />
                    </div>
                </div>
            </Grid>
            <Grid item md={3}>
                <RightBar>
                    <WeatherCard weather={weather} />
                    <CovidCard />
                </RightBar>
            </Grid>
        </Grid>
    )
}