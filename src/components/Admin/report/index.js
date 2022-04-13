import React from "react";
import { Container, Paper, Typography, Card, Grid, Button } from "@material-ui/core";
import { tableStyles } from "../../../style";
import { AddLocation, Report, Event } from "@material-ui/icons";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

export default function AdminReport() {

    const classes = tableStyles();

    const data = [
        {
            name: 'Tháng 1',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Tháng 2',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Tháng 3',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Tháng 4',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Tháng 5',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Tháng 6',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Tháng 7',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Tháng 8',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Tháng 9',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Tháng 10',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Tháng 11',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Tháng 12',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <Container className={classes.container}>
            <div>
                <Grid container>
                    <Grid item md={4} >
                        <Link to={`/admin/postReport`}>
                            <Card className={classes.cardInfo}>
                                <Typography variant="h5">
                                    Số bài viết bị báo cáo
                                </Typography>
                                <Typography variant="h3" className={classes.cardValue}>
                                    <Report className={classes.cardIcon} />
                                    1300
                                </Typography>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item md={4}>
                        <Link to={`/admin/locationContribute`}>
                            <Card className={classes.cardInfo}>
                                <Typography variant="h5">
                                    Số địa điểm được đóng góp
                                </Typography>
                                <Typography variant="h3" className={classes.cardValue}>
                                    <AddLocation className={classes.cardIcon} />
                                    1
                                </Typography>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item md={4}>
                        <Link to={`/admin/eventContribute`}>
                            <Card className={classes.cardInfo}>
                                <Typography variant="h5">
                                    Sự kiến được đóng góp
                                </Typography>
                                <Typography variant="h3" className={classes.cardValue}>
                                    <Event className={classes.cardIcon} />
                                    0
                                </Typography>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Paper className={classes.paper}>
                <div>
                    <Card>
                        <BarChart
                            width={1000}
                            height={600}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" stackId="a" fill="#8884d8" name="Địa điểm" />
                            <Bar dataKey="amt" stackId="a" fill="#82ca9d" name="Sự kiện" />
                            <Bar dataKey="uv" fill="#ffc658" name="Bài viết" />
                        </BarChart>
                    </Card>
                </div>
            </Paper>
        </Container>
    );
}
