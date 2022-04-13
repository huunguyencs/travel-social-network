import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Card, Grid, Box, CardHeader } from "@material-ui/core";
import { tableStyles } from "../../style";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Explore, Person, PostAdd } from "@material-ui/icons";
import { useSelector } from "react-redux";
import customAxios from "../../utils/fetchData";

const data = [
    { month: "Jan", user: 100, tour: 2, post: 300 },
    { month: "Feb", user: 120, tour: 3, post: 400 },
    { month: "Mar", user: 140, tour: 4, post: 450 },
    { month: "Apr", user: 150, tour: 5, post: 490 },
    { month: "May", user: 170, tour: 8, post: 500 },
    { month: "Jun", user: 200, tour: 10, post: 700 },
    { month: "Jul", user: 210, tour: 15, post: 740 },
    { month: "Aug", user: 210, tour: 15, post: 900 },
    { month: "Sep", user: 180, tour: 9, post: 600 },
    { month: "Oct", user: 150, tour: 5, post: 400 },
    { month: "Nov", user: 130, tour: 2, post: 300 },
    { month: "Dec", user: 110, tour: 2, post: 100 },
]


function AdminHome(props) {

    const classes = tableStyles();
    const { token } = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [tours, setTours] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    const getAllUsers = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get(`/user/all`).then(res => {
            setUsers(res.data.users);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError('Có lỗi xảy ra')
        })
    }

    const getAllTours = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get(`/tour/tours`).then(res => {
            setTours(res.data.tours);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError('Có lỗi xảy ra')
        })
    }

    const getAllPosts = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get(`/post/posts`).then(res => {
            setPosts(res.data.posts);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError('Có lỗi xảy ra')
        })
    }
    
    useEffect(() => {
        getAllUsers(token);
        getAllTours(token);
        getAllPosts(token);
    }, [token]);

    return (
        <Container className={classes.container}>
            <div>
                <Grid container>
                    <Grid item md={4} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số người dùng
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Person className={classes.cardIcon} />
                                {users.length}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số hành trình
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <Explore className={classes.cardIcon} />
                                {tours.length}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số bài viết / review
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <PostAdd className={classes.cardIcon} />
                                {posts.length}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Paper className={classes.paper}>
                <div>
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
                                    <ResponsiveContainer className="chart" height={500} width={1200}>
                                        <LineChart
                                            width={1000}
                                            height={500}
                                            data={data}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="user" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="tour" stroke="#82ca9d" />
                                            <Line type="monotone" dataKey="post" stroke="#ECCC68" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Box>
                    </Card>
                </div>
            </Paper>
        </Container>
    );
}

export default AdminHome;