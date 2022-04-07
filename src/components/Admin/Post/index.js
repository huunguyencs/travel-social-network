import React from "react";
import { Container, Paper, Typography, Card, Grid } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import { tableStyles } from "../../../style";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// const columns = [
//     {
//         field: 'name',
//         headerName: 'Tên',
//         width: 300,
//     },
//     {
//         field: 'type',
//         headerName: 'Loại',
//         width: 250,
//     },
//     {
//         field: 'cooperator',
//         headerName: 'Sở hữu',
//         width: 250,
//         valueGetter: (service) => service.row.cooperator.fullname
//     },
//     {
//         field: 'rate',
//         headerName: 'Đánh giá (/5)',
//         width: 200,
//         valueGetter: (service) => getStar(service.row.star)
//     },
//     {
//         field: 'numRate',
//         headerName: 'Lượt đánh giá',
//         width: 200,
//         valueGetter: (service) => totalNumRate(service.row.star)
//     }
// ];

const data = [
    {
        name: 'Tháng 1',
        post: 4000,
        review: 2400,
    },
    {
        name: 'Tháng 2',
        post: 3000,
        review: 1398,
    },
    {
        name: 'Tháng 3',
        post: 2000,
        review: 9800,
    },
    {
        name: 'Tháng 4',
        post: 2780,
        review: 3908,
    },
    {
        name: 'Tháng 5',
        post: 1890,
        review: 4800,
    },
    {
        name: 'Tháng 6',
        post: 2390,
        review: 3800,
    },
    {
        name: 'Tháng 7',
        post: 3490,
        review: 4300,
    },
    {
        name: 'Tháng 8',
        post: 2490,
        review: 3300,
    },
    {
        name: 'Tháng 9',
        post: 3490,
        review: 6300,
    },
    {
        name: 'Tháng 10',
        post: 4090,
        review: 4300,
    },
    {
        name: 'Tháng 11',
        post: 3090,
        review: 3300,
    },
    {
        name: 'Tháng 12',
        post: 4490,
        review: 5080,
    },
];

function AdminPosts(props) {
    const classes = tableStyles();
    return (
        <Container className={classes.container}>
            <div>
                <Grid container>
                    <Grid item md={6} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số bài viết
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <PostAdd className={classes.cardIcon} />
                                1300
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item md={6} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số review
                            </Typography>
                            <Typography variant="h3" className={classes.cardValue}>
                                <PostAdd className={classes.cardIcon} />
                                1300
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Paper className={classes.paper}>
                <div>
                    <BarChart
                        width={1000}
                        height={600}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="post" stackId="a" fill="#8884d8" />
                        <Bar dataKey="review" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </div>
            </Paper>
        </Container>
    );
}

export default AdminPosts;