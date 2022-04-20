import { Container, Paper, Typography, Card, Grid } from '@material-ui/core';
import { tableStyles } from '../../../style';
import { AddLocation, Report, Event } from '@material-ui/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import customAxios from '../../../utils/fetchData';

function handling(arr) {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    if (d.getFullYear() === new Date().getFullYear()) {
      data[mon] += 1;
    }
  });
  return data;
}

function getData(reports, locationContributes, eventContributes) {
  const data = [
    {
      name: 'Tháng 1',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 2',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 3',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 4',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 5',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 6',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 7',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 8',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 9',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 10',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 11',
      report: 0,
      location: 0,
      event: 0
    },
    {
      name: 'Tháng 12',
      report: 0,
      location: 0,
      event: 0
    }
  ];

  let report = handling(reports);
  let location = handling(locationContributes);
  let event = handling(eventContributes);

  //console.log(reports);
  for (let i = 0; i < 12; i++) {
    data.at(i).report = report.at(i);
    data.at(i).event = event.at(i);
    data.at(i).location = location.at(i);
  }
  console.log(data);
  return data;
}

export default function AdminReport() {
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [reports, setReports] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllReports = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/report/all')
      .then(res => {
        setReports(res.data.reports);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    getAllReports(token);
  }, [token]);

  useEffect(() => {
    document.title = 'Admin - Ý kiến đóng góp';
  }, []);

  return (
    <Container className={classes.container}>
      <div>
        <Grid container>
          <Grid item md={4}>
            <Link to={`/admin/postReport`}>
              <Card className={classes.cardInfo}>
                <Typography variant="h5">Số bài viết bị báo cáo</Typography>
                <Typography variant="h3" className={classes.cardValue}>
                  <Report className={classes.cardIcon} />
                  {reports.length}
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item md={4}>
            <Link to={`/admin/locationContribute`}>
              <Card className={classes.cardInfo}>
                <Typography variant="h5">Số địa điểm được đóng góp</Typography>
                <Typography variant="h3" className={classes.cardValue}>
                  <AddLocation className={classes.cardIcon} />1
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item md={4}>
            <Link to={`/admin/eventContribute`}>
              <Card className={classes.cardInfo}>
                <Typography variant="h5">Sự kiến được đóng góp</Typography>
                <Typography variant="h3" className={classes.cardValue}>
                  <Event className={classes.cardIcon} />0
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
              data={getData(reports, locations, events)}
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
              <Bar dataKey="report" stackId="a" fill="#8884d8" name="Báo cáo" />
              <Bar
                dataKey="location"
                stackId="a"
                fill="#82ca9d"
                name="Địa điểm"
              />
              <Bar dataKey="event" fill="#ffc658" name="Sự kiện" />
            </BarChart>
          </Card>
        </div>
      </Paper>
    </Container>
  );
}
