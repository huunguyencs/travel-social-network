import { Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { cardStyles } from "../../style";

export default function CovidCard(props) {

    const { name } = props;
    const [data, setData] = useState(null);
    const [updateDate, setUpdateDate] = useState('');

    const classes = cardStyles();

    useEffect(() => {
        const getData = async () => {
            await fetch('https://static.pipezero.com/covid/data.json').then(res => res.json()).then(data => {
                for (var loc of data.locations) {
                    if (loc.name === name) {
                        setData(loc);
                        break;
                    }
                }
                setUpdateDate(data.overview[data.overview.length - 1].date);
            });
        }
        if (name) {
            getData();
        }

    }, [name])

    return (
        <Card className={classes.weatherCardContainer}>
            <div className={classes.title}>
                <Typography variant="h6">Tình hình Covid-19</Typography>
            </div>

            <CardContent className={classes.content}>
                {
                    data ?
                        <div className={classes.detailInfo}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Typography variant="h6">{data.name}</Typography>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, }}>
                                <Typography>Cập nhật ngày {updateDate}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Tổng ca nhiễm:</Typography>
                                <Typography className={classes.value}>{data.cases}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Số ca nhiễm mới:</Typography>
                                <Typography className={classes.value}>{data.casesToday}</Typography>
                            </div>
                            <div className={classes.itemInfo}>
                                <Typography>Tử vong:</Typography>
                                <Typography className={classes.value}>{data.death}</Typography>
                            </div>
                        </div> :
                        <CircularProgress />
                }

            </CardContent>
        </Card>
    )
}