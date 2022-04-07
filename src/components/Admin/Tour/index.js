import React from "react";
import { Container, Paper, Typography, Card, Grid } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import { tableStyles } from "../../../style";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";


const colors = scaleOrdinal(schemeCategory10).range();

const data = [
    {
        name: "Tháng 1",
        uv: 4000,
    },
    {
        name: "Tháng 2",
        uv: 3000,
    },
    {
        name: "Tháng 3",
        uv: 2000,
    },
    {
        name: "Tháng 4",
        uv: 2780,
    },
    {
        name: "Tháng 5",
        uv: 1890,
    },
    {
        name: "Tháng 6",
        uv: 2390,
    },
    {
        name: "Tháng 7",
        uv: 3490,
    },
    {
        name: "Tháng 8",
        uv: 490,
    },
    {
        name: "Tháng 9",
        uv: 1490,
    },
    {
        name: "Tháng 10",
        uv: 3790,
    },
    {
        name: "Tháng 11",
        uv: 2490,
    },
    {
        name: "Tháng 12",
        uv: 3090,
    }
];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3
        } 
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width
        }, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function AdminTour() {
    const classes = tableStyles();
    return (
        <Container className={classes.container}>
            <div>
                <Grid container>
                    <Grid item md={6} >
                        <Card className={classes.cardInfo}>
                            <Typography variant="h5">
                                Tổng số tour
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
                        <Bar
                            dataKey="uv"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </Paper>
        </Container>
    );
}
