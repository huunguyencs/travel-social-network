import { Container, Typography, Card, Grid, Box, CardHeader } from "@material-ui/core";
import { tableStyles } from "../../../style";
import { AddLocation, Place, Event } from "@material-ui/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import customAxios from "../../../utils/fetchData";

function handling(arr) {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
    if (d.getFullYear() === (new Date()).getFullYear()) {
      data[mon] += 1;
    }
  });
  return data;
}

function getData(provinceContributes, locationContributes, eventContributes) {
  const data = [
    {
      name: 'Tháng 1',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 2',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 3',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 4',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 5',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 6',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 7',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 8',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 9',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 10',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 11',
      province: 0,
      location: 0,
      event: 0,
    },
    {
      name: 'Tháng 12',
      province: 0,
      location: 0,
      event: 0,
    },
  ];

  let report = handling(provinceContributes);
  let location = handling(locationContributes);
  let event = handling(eventContributes);

  for (let i = 0; i < 12; i++) {
    data.at(i).report = report.at(i);
    data.at(i).event = event.at(i);
    data.at(i).location = location.at(i);
  }
  return data;
}

export default function AdminContribute() {
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [provinces, setProvinces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProvinces = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/province_contribute/all')
      .then(res => {
        setProvinces(res.data.provinces);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  const getAllEvents = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/event_contribute/all')
      .then(res => {
        setEvents(res.data.events)
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  const getAllLocations = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/location_contribute/all')
      .then(res => {
        setLocations(res.data.locations);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    getAllProvinces(token);
    getAllEvents(token);
    getAllLocations(token);
  }, [token]);

  useEffect(() => {
    document.title = 'Admin - Ý kiến đóng góp';
  }, []);

  return (
    <Container className={classes.container}>
      <div>
        <Grid container>
          <Grid item md={4} >
            <Link to={`/admin/provinceContribute`}>
              <Card className={classes.cardInfo}>
                <Typography variant="h5">
                  Số tỉnh được đóng góp
                </Typography>
                <Typography variant="h3" className={classes.cardValue}>
                  <Place className={classes.cardIcon} />
                  {provinces.length}
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
                  {locations.length}
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
                  {events.length}
                </Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div>
        <Card>
          <CardHeader title="Thống kê" subheader={"Biến động năm " + (new Date()).getFullYear().toString()} />
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
                <Card>
                  <BarChart
                    width={1000}
                    height={500}
                    loading = {loading}
                    error = {error}
                    data={getData(provinces, locations, events)}
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
                    <Bar dataKey="location" stackId="a" fill="#8884d8" name="Địa điểm" />
                    <Bar dataKey="event" stackId="a" fill="#82ca9d" name="Sự kiện" />
                    <Bar dataKey="province" fill="#ffc658" name="Tỉnh/thành" />
                  </BarChart>
                </Card>
              </div>
            </div>
          </Box>
        </Card>
      </div>
    </Container>
  );
}
