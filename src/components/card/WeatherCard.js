import { Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { cardStyles } from "../../style";
import { weatherFocast } from "../../utils/weather";
import { convertDateToStr } from "../../utils/date";

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

export default function WeatherCard(props) {

    const { name, nameShow } = props;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherFocast(name, (respone) => {
            setWeather(respone);
        });
    }, [name, setWeather])

    const classes = cardStyles();

    const firstUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <Card className={classes.weatherCardContainer}>
            {
                weather && weather.weather ?
                    <CardContent className={classes.content}>
                        <div className={classes.weatherTitle}>
                            <Typography variant="h5">{nameShow}</Typography>
                            <Typography>{convertDateToStr(new Date(weather.dt * 1000))}</Typography>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} className={classes.icon} />
                        </div>

                        <div className={classes.temp}>
                            <Typography variant="h4">~ {Math.floor(weather.main.temp - 273.15)} °C</Typography>
                            <Typography variant="h6">{convertToVN(weather.weather[0].main)}</Typography>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                            <Typography variant="h6">{firstUpperCase(weather.weather[0].description)}</Typography>
                        </div>

                        <div className={classes.detailInfo}>
                            <div className={classes.itemInfo}>
                                <Typography>Độ ẩm: </Typography>
                                <Typography className={classes.value}>{weather.main.humidity} %</Typography>
                            </div>
                            {/* <div className={classes.itemInfo}>
                        <Typography>Khả năng mưa: </Typography>
                        <Typography className={classes.value}>{weather.rain} %</Typography>
                    </div> */}
                            <div className={classes.itemInfo}>
                                <Typography>Tốc độ gió: </Typography>
                                <Typography className={classes.value}>{weather.wind.speed} m/s</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Tầm nhìn xa: </Typography>
                                <Typography className={classes.value}>~ {Math.floor(weather.visibility / 1000)} Km</Typography>
                            </div>
                        </div>
                    </CardContent>
                    :
                    <CardContent>
                        <CircularProgress />
                    </CardContent>
            }
        </Card>
    )
}