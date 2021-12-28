import { IconButton, Link, Paper, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { WeatherFocastItem } from '../card/WeatherCard'

export default function WeatherFocast({ weather, handleClose, nameShow, alert }) {
    return (
        <Paper style={{ margin: 30, marginTop: 50, borderRadius: 10, padding: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <div />
                <IconButton>
                    <Close onClick={handleClose} />
                </IconButton>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
                <Typography variant={"h4"}>Dự báo thời tiết {nameShow}</Typography>
            </div>
            {alert &&
                <div style={{ margin: "auto" }}>
                    <Typography>
                        ⚠️⚠️⚠️ Cảnh báo ⚠️⚠️⚠️
                    </Typography>
                    <Typography>{alert.event}</Typography>
                    <Typography>Từ {alert.start} đến {alert.end}</Typography>
                    <Typography>{alert.description}</Typography>
                </div>
            }
            <ScrollMenu>
                {weather && weather.map(item =>
                    <WeatherFocastItem weather={item} />
                )}
            </ScrollMenu>
            <div style={{ display: "flex", justifyContent: "right", margin: 10 }}>
                <Typography variant="subtitle2">Dữ liệu được lấy từ <Link href="https://openweathermap.org/" target='_blank'>OpenWeatherMap</Link></Typography>
            </div>
        </Paper>
    )
}
