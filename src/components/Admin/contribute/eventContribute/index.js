import React, { useEffect, useState } from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MoreVert } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import customAxios from '../../../../utils/fetchData';
// import { getStar, totalNumRate } from "../../../../utils/utils";
import { tableStyles } from '../../../../style';

const columns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
    sortable: false
  },
  {
    field: 'fullname',
    headerName: 'Tên đầy đủ',
    width: 350
  },
  {
    field: 'province',
    headerName: 'Tỉnh',
    width: 200,
    valueGetter: event => event.row.provinceId?.fullname || 'All'
  },
  {
    field: 'time',
    headerName: 'Thời gian',
    width: 150
  },
  {
    field: 'calendar',
    headerName: 'Lịch',
    width: 150,
    valueGetter: event => (event.row.calendarType ? 'DL' : 'AL')
  },
  {
    field: 'action',
    headerName: 'Chỉnh sửa',
    width: 150,
    sortable: false,
    renderCell: event => (
      <IconButton
        size="small"
        component={Link}
        to={`/admin/eventContribute/${event.row.name}`}
        title="Chỉnh sửa"
      >
        <MoreVert />
      </IconButton>
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

export default function AdminEventContribute(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [events, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const getAllLocations = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/event_contribute/all')
      .then(res => {
        setLocations([]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    getAllLocations(token);
  }, [token]);

  useEffect(() => {
    document.title = 'Admin - Sự kiện được đóng góp';
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">
            {events.length} sự kiện được đóng góp
          </Typography>
        </div>
      </div>

      <Paper className={classes.paper}>
        <DataGrid
          rows={events}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          pagination
          onRowDoubleClick={location => {
            history.push(`/admin/eventContribute/${location.row.name}`);
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
