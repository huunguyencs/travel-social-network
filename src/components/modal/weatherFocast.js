import { Button, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { WeatherFocastItem } from '../card/WeatherCard'

export default function WeatherFocast({ weather, handleClose, nameShow, alert }) {
    return (
        <Paper style={{ margin: 30, borderRadius: 10, padding: 15 }}>
            <div style={{ display: "flex", justifyContent: "center", margin: 30 }}>
                <Typography variant={"h5"}>Dựa báo thời tiết {nameShow}</Typography>
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
                    <WeatherFocastItem weather={item} nameShow={nameShow} />
                )}
            </ScrollMenu>
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <Button onClick={handleClose}>Đóng</Button>
            </div>
        </Paper>
    )
}
