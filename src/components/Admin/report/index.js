<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Card, Grid, Typography, Box, CardHeader } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Visibility } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import customAxios from '../../../utils/fetchData';
import { tableStyles } from '../../../style';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip
} from 'recharts';
=======
import {
  Container,
  Typography,
  Card,
  Grid,
  Box,
  CardHeader
} from '@material-ui/core';
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
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e

function handling(arr) {
  const tour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr.forEach(element => {
    let d = new Date(element.createdAt);
    let mon = d.getMonth();
<<<<<<< HEAD
    if (d.getFullYear() === (new Date()).getFullYear()) {
      tour[mon] += 1;
=======
    if (d.getFullYear() === new Date().getFullYear()) {
      data[mon] += 1;
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    }
  });
  return tour;
}

function getData(arr) {
  const data = [
    {
      name: "Tháng 1",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 2",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 3",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 4",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 5",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 6",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 7",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 8",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 9",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 10",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 11",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    },
    {
      name: "Tháng 12",
      report: 0,
<<<<<<< HEAD
=======
      location: 0,
      event: 0
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
    }
  ];

  let reports = handling(arr);
  for (let i = 0; i < 12; i++) {
    data.at(i).report = reports.at(i);
  }
  return data;
}

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
    sortable: false
  },
  {
    field: 'user',
    headerName: 'Người báo cáo',
    width: 200,
    valueGetter: report => report.row.userId.fullname
  },
  {
    field: 'type',
    headerName: 'Lý do',
    width: 175
  },
  {
    field: 'content',
    headerName: 'Nôi dung',
    width: 175
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 175,
    valueGetter: report =>
      report.row.state === 2
        ? 'Đã xử lý' : 'Chưa xử lý'
  },
  {
    field: 'action',
    headerName: 'Chi tiết',
    width: 150,
    sortable: false,
    renderCell: report => (
      report.row.state === 1 || report.row.state === 0 ?
        <IconButton
          size="small"
          component={Link}
          to={`/admin/report/${report.row._id}`}
          title={'Chi tiết'}
        >
          <Visibility />
        </IconButton> : <div></div>
    )
  }
];

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function AdminPostReport(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

<<<<<<< HEAD
  const [reports, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
=======
  const [reports, setReports] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e

  const getAllReports = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/report/all')
      .then(res => {
        setLocations(res.data.reports);
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
    document.title = 'Admin - Bài viết bị báo cáo';
  }, []);

  return (
    <Container className={classes.container}>
<<<<<<< HEAD
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">
            {reports.length} bài viết bị báo cáo
          </Typography>
        </div>
=======
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
                  <AddLocation className={classes.cardIcon} />
                  {locations.length}
                </Typography>
              </Card>
            </Link>
          </Grid>
          <Grid item md={4}>
            <Link to={`/admin/eventContribute`}>
              <Card className={classes.cardInfo}>
                <Typography variant="h5">Sự kiến được đóng góp</Typography>
                <Typography variant="h3" className={classes.cardValue}>
                  <Event className={classes.cardIcon} />
                  {events.length}
                </Typography>
              </Card>
            </Link>
          </Grid>
        </Grid>
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
      </div>

      <Grid>
        <Card>
          <CardHeader
            title="Thống kê"
            subheader={'Biến động năm ' + new Date().getFullYear().toString()}
          />
          <Box>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingTop: '20px',
                  borderRadius: '15px',
                  width: '90%',
                  justifyContent: 'center',
                  display: 'flex'
                }}
              >
<<<<<<< HEAD
                <ResponsiveContainer className="chart" height={300}>
                  <LineChart
                    width={400}
                    height={300}
                    data={getData(reports)}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
=======
                <Card>
                  <BarChart
                    width={1000}
                    height={500}
                    loading={loading}
                    error={error}
                    data={getData(reports, locations, events)}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
<<<<<<< HEAD
                    <Line
                      type="monotone"
                      dataKey="report"
                      stroke="#8884d8"
                      name="Báo cáo"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
=======
                    <Bar
                      dataKey="location"
                      stackId="a"
                      fill="#8884d8"
                      name="Địa điểm"
                    />
                    <Bar
                      dataKey="event"
                      stackId="a"
                      fill="#82ca9d"
                      name="Sự kiện"
                    />
                    <Bar dataKey="report" fill="#ffc658" name="Báo cáo" />
                  </BarChart>
                </Card>
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e
              </div>
            </div>
          </Box>
        </Card>
      </Grid>

      <Paper className={classes.paper}>
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          pagination
          onRowDoubleClick={report => {
            history.push(`/admin/report/${report.row._id}`);
          }}
          autoHeight
          loading={loading}
          error={error}
          getRowId={row => row._id}
          disableSelectionOnClick
          components={{
            Toolbar: ExportToolbar
          }}
        />
      </Paper>
    </Container>
  );
}
