import { Card, Grid, makeStyles, Typography, Box, CardHeader } from "@material-ui/core";
import { Group, Person, PostAdd } from "@material-ui/icons";
import React, { useEffect } from "react";
import LeftBar from "../../components/Leftbar";
import { adminListMenu } from "../../constant/adminMenu";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 140,
    },
    cardInfo: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    cardValue: {
        marginTop: 10,
    },
    cardIcon: {
        fontSize: "37px",
        marginRight: 30,
    }
}))

const data = [
    { month: "Jan", user: 100, group: 2, post: 300 },
    { month: "Feb", user: 120, group: 3, post: 400 },
    { month: "Mar", user: 140, group: 4, post: 450 },
    { month: "Apr", user: 150, group: 5, post: 490 },
    { month: "May", user: 170, group: 8, post: 500 },
    { month: "Jun", user: 200, group: 10, post: 700 },
    { month: "Jul", user: 210, group: 15, post: 740 },
    { month: "Aug", user: 210, group: 15, post: 900 },
    { month: "Sep", user: 180, group: 9, post: 600 },
    { month: "Oct", user: 150, group: 5, post: 400 },
    { month: "Nov", user: 130, group: 2, post: 300 },
    { month: "Dec", user: 110, group: 2, post: 100 },
]

export default function AdminHome(props) {

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Admin';
    }, [])

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>

            <Grid item md={9} style={{ height: "100vh" }}>
                <div className={classes.appBarSpacer} />
                <Grid container>
                    <Grid item md={4} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số người dùng
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Person className={classes.cardIcon} />
                                1300
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số nhóm
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Group className={classes.cardIcon} />
                                57
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Số bài viết mới trong tuần
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <PostAdd className={classes.cardIcon} />
                                180
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                <Grid>
                    <Card>
                        <CardHeader title="Website Visits" subheader="(+43%) than last year" />
                        <Box>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px"
                                }}>

                                <div
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        paddingTop: "20px",
                                        borderRadius: "15px",
                                        width: "90%",
                                        justifyContent: "center",
                                        display: "flex",
                                    }}
                                >
                                    <ResponsiveContainer className="chart" height={300}>
                                        <LineChart
                                            width={400}
                                            height={300}
                                            data={data}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="user" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="post" stroke="#82ca9d" />
                                            <Line type="monotone" dataKey="group" stroke="#ECCC68" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Box>
                    </Card>

                </Grid>
            </Grid>
        </Grid>
    )
}