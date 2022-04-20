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
import { tableStyles } from '../../../../style';

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
      report.row.state === 0
        ? 'Chưa xử lý'
        : report.row.state === 1
        ? 'Đang xử lý'
        : 'Đã xử lý'
  },
  {
    field: 'action',
    headerName: 'Chi tiết',
    width: 150,
    sortable: false,
    renderCell: report => (
      <IconButton
        size="small"
        component={Link}
        to={`/admin/postReport/${report.row._id}`}
        title={'Chi tiết'}
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

export default function AdminPostReport(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [reports, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

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
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">
            {reports.length} bài viết bị báo cáo
          </Typography>
        </div>
      </div>

      <Paper className={classes.paper}>
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          pagination
          onRowDoubleClick={report => {
            history.push(`/admin/postReport/${report.row._id}`);
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
