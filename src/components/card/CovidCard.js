import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

import { cardStyles } from "../../style";

export default function CovidCard(props) {

    const classes = cardStyles();

    return (
        <Card className={classes.weatherCardContainer}>
            <div className={classes.title}>
                <Typography variant="h6">Tình hình Covid-19</Typography>
            </div>
            <CardContent className={classes.content}>
                <div className={classes.detailInfo}>
                    <div className={classes.itemInfo}>
                        <Typography>Tổng ca nhiễm:</Typography>
                        <Typography className={classes.value}>100</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Số ca nhiễm mới trong tuần:</Typography>
                        <Typography className={classes.value}>100</Typography>
                    </div>
                    <div className={classes.itemInfo}>
                        <Typography>Vùng:</Typography>
                        <Typography className={classes.value}>Đỏ</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}