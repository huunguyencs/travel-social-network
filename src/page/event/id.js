import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@material-ui/core";
import { Event, LocationOn } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageList from "../../components/modal/ImageList";
import SpeedDialButton from "../../components/speedDialBtn";
import { eventStyles } from "../../style";

const imageList = [
    "http://hanoimoi.com.vn/Uploads/images/tuandiep/2020/02/07/den%20hung.jpg",
    "http://baodautu.vn/Images/thutrang/2020/04/01/le-hoi-den-hung-ngay-hoi-non-song-ngay-hoi-toan-dan1585742636.jpg",
    "https://hanoimoi.com.vn/Uploads/lequyen/2019/4/8/3.jpg",
    "https://img.nhandan.com.vn/Files/Images/2021/02/23/2_9-1614068063580.JPG",
]

export default function EventPage(props) {

    const classes = eventStyles();

    useEffect(() => {
        document.title = "Sự kiện";
    }, [])

    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid item md={12} className={classes.coverImage}>
                <div className={classes.imgBg}>
                    <div className={classes.coverText}>
                        <Typography variant="h1" style={{ color: "black" }}>
                            Lễ hội đền Hùng
                        </Typography>
                        <div>
                            <LocationOn style={{ fontSize: "50px", marginRight: "30px", color: "black" }} />
                            <Typography variant="h2" component={Link} to={"/province/1"}>
                                Phú Thọ
                            </Typography>
                        </div>
                        <div className={classes.time}>
                            <Event style={{ fontSize: "50px", marginRight: "30px", color: "black" }} />
                            <Typography variant="h4" color="black">
                                10/3 Âm lịch
                            </Typography>
                        </div>
                    </div>
                </div>
            </Grid>
            <Container className={classes.content}>
                <Card className={classes.cardContent}>
                    <CardMedia>
                        <ImageList imgList={imageList} />
                    </CardMedia>
                    <CardContent>
                        <Typography>
                            Lễ hội đền Hùng
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Grid>
    )
}