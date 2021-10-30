import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

import icon from "./weather-icon";
import { cardStyles } from "../../style";

export default function WeatherCard(props) {

    const classes = cardStyles();

    return (
        <Card className={classes.weatherCardContainer}>
            <CardContent className={classes.content}>
                <div className={classes.weatherTitle}>
                    <Typography variant="h5">{props.weather.name}</Typography>
                    <Typography>{props.weather.time}</Typography>
                    <img src={icon.cloudy} alt="sun" className={classes.icon} />
                </div>

                <div className={classes.temp}>
                    <Typography variant="h4">~ {props.weather.temp} °C</Typography>
                    <Typography variant="h6">{props.weather.describe}</Typography>
                </div>

                <div className={classes.detailInfo}>
                    <div className={classes.itemInfo}>
                        <Typography>Độ ẩm: </Typography>
                        <Typography className={classes.value}>{props.weather.humidity} %</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Khả năng mưa: </Typography>
                        <Typography className={classes.value}>{props.weather.rain} %</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Tốc độ gió: </Typography>
                        <Typography className={classes.value}>{props.weather.vWind} m/s</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Tầm nhìn xa: </Typography>
                        <Typography className={classes.value}>{props.weather.visibility} Km</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}