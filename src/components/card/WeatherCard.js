import { Backdrop, Button, Card, CardContent, CircularProgress, Fade, Modal, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { cardStyles } from "../../style";
import { weatherFocast } from "../../utils/weather";
import { convertDateToStr } from "../../utils/date";
import WeatherFocast from "../modal/weatherFocast";
import { getTime } from "../../utils/date";

const convertToVN = (main) => {
    switch (main) {
        case "Thunderstorm":
            return "Có giông";
        case "Drizzle":
            return "Mưa nhẹ";
        case "Rain":
            return "Có mưa";
        case "Snow":
            return "Có tuyết";
        case "Clear":
            return "Trong lành";
        case "Clouds":
            return "Có mây";
        default:
            return main;
    }
}

function WeatherCard(props) {

    const classes = cardStyles();

    const firstUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const { weather, nameShow } = props;
    return (

        <CardContent className={classes.content}>
            <div className={classes.weatherTitle}>
                <Typography variant="h5">{nameShow}</Typography>
                <Typography>{convertDateToStr(weather.dt * 1000)}</Typography>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} className={classes.icon} />
            </div>

            <div className={classes.temp}>
                <Typography variant="h4">~ {Math.round(weather.temp)} °C</Typography>
                <Typography variant="h6">{convertToVN(weather.weather[0].main)}</Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                <Typography variant="h6">{firstUpperCase(weather.weather[0].description)}</Typography>
            </div>

            <div className={classes.detailInfo}>
                <div className={classes.itemInfo}>
                    <Typography>Bình minh: </Typography>
                    <Typography className={classes.value}>{getTime(weather.sunrise * 1000)}</Typography>
                </div>
                <div className={classes.itemInfo}>
                    <Typography>Hoàng hôn: </Typography>
                    <Typography className={classes.value}>{getTime(weather.sunset * 1000)}</Typography>
                </div>
                <div className={classes.itemInfo}>
                    <Typography>Độ ẩm: </Typography>
                    <Typography className={classes.value}>{weather.humidity} %</Typography>
                </div>
                <div className={classes.itemInfo}>
                    <Typography>Tốc độ gió: </Typography>
                    <Typography className={classes.value}>{weather.wind_speed} m/s</Typography>
                </div>
                <div className={classes.itemInfo}>
                    <Typography>Tầm nhìn xa: </Typography>
                    <Typography className={classes.value}>~ {Math.floor(weather.visibility / 1000)} Km</Typography>
                </div>
                <div className={classes.itemInfo}>
                    <Typography>UVI: </Typography>
                    <Typography className={classes.value}>{weather.uvi}</Typography>
                </div>
            </div>
        </CardContent>
    )
}

export function WeatherFocastItem(props) {
    const classes = cardStyles();

    const firstUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const { weather } = props;

    return (
        <Card style={{ width: 500, margin: 10, borderRadius: 5 }}>
            <CardContent className={classes.content}>
                <div className={classes.weatherTitle}>
                    <Typography variant="h6">{convertDateToStr(weather.dt * 1000)}</Typography>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} className={classes.icon} />
                </div>

                <div className={classes.temp}>
                    <div>
                        <Typography variant="h6">{Math.round(weather.temp.min)} - {Math.round(weather.temp.max)} °C</Typography>
                        <Typography variant="h6">Ngày: {Math.round(weather.temp.day)} °C</Typography>
                        <Typography variant="h6">Đêm: {Math.round(weather.temp.night)} °C</Typography>
                    </div>
                    <Typography variant="h5">{convertToVN(weather.weather[0].main)}</Typography>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <Typography variant="h6">{firstUpperCase(weather.weather[0].description)}</Typography>
                </div>

                <div className={classes.detailInfo}>
                    <div className={classes.itemInfo}>
                        <Typography>Bình minh: </Typography>
                        <Typography className={classes.value}>{getTime(weather.sunrise * 1000)}</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Hoàng hôn: </Typography>
                        <Typography className={classes.value}>{getTime(weather.sunset * 1000)}</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Độ ẩm: </Typography>
                        <Typography className={classes.value}>{weather.humidity} %</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Tốc độ gió: </Typography>
                        <Typography className={classes.value}>{weather.wind_speed} m/s</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Có mây: </Typography>
                        <Typography className={classes.value}>{weather.clouds} %</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Mưa: </Typography>
                        <Typography className={classes.value}>{weather.rain} mm</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>UVI: </Typography>
                        <Typography className={classes.value}>{weather.uvi}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function WeatherCardGeneral(props) {
    const { position, nameShow } = props;
    const [weather, setWeather] = useState(null);

    const classes = cardStyles();

    const [show, setShow] = useState(false);

    useEffect(() => {
        weatherFocast(position, (respone) => {
            setWeather(respone);
        });
    }, [position, setWeather])

    return (
        <Card className={classes.weatherCardContainer}>
            {weather ?
                <>
                    <WeatherCard weather={weather.current} nameShow={nameShow} />
                    <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                        <Button onClick={() => setShow(true)} style={{ paddingInline: 20, backgroundColor: "#A5DEC8" }}>
                            Xem dự báo
                        </Button>
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={show}
                        onClose={() => setShow(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={show}>
                            <WeatherFocast weather={weather.daily} handleClose={() => setShow(false)} nameShow={nameShow} alert={weather.alert} />
                        </Fade>
                    </Modal>
                </> : <CircularProgress />
            }
        </Card>
    )
}