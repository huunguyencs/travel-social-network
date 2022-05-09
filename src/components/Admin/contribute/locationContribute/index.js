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
<<<<<<< HEAD:src/components/Admin/contribute/locationContribute/index.js
    {
        field: '_id',
        headerName: 'ID',
        width: 230,
        sortable: false,
    },
    {
        field: 'fullname',
        headerName: 'Tên đầy đủ',
        width: 240
    },
    {
        field: 'province',
        headerName: 'Tỉnh',
        width: 200,
        valueGetter: (location) => location.row.province.fullname
    },
    {
        field: 'type',
        headerName: 'Thể loại',
        width: 200,
        valueGetter: (location) => location?.contributeId ? "Chỉnh sửa địa điểm" : "Đóng góp địa điểm"
    },
    {
        field: 'state',
        headerName: 'Trạng thái',
        width: 200,
        valueGetter : (location) => location.state == true ? "Đã xử lý" : "Chưa xử lý"
    },
    {
        field: 'action',
        headerName: 'Chi tiết',
        width: 150,
        sortable: false,
        renderCell: (location) => (
            <IconButton size='small' component={Link} to={`/admin/locationContribute/${location.row._id}`} title={'Chi tiết'}>
                <MoreVert />
            </IconButton>
        )
    }
]
=======
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
    sortable: false
  },
  {
    field: 'fullname',
    headerName: 'Tên đầy đủ',
    width: 300
  },
  {
    field: 'province',
    headerName: 'Tỉnh',
    width: 200,
    valueGetter: location => location.row.province.fullname
  },
  {
    field: 'action',
    headerName: 'Chi tiết',
    width: 150,
    sortable: false,
    renderCell: location => (
      <IconButton
        size="small"
        component={Link}
        to={`/admin/locationContribute/${location.row.name}`}
        title={'Chi tiết'}
      >
        <MoreVert />
      </IconButton>
    )
  }
];
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e:src/components/Admin/report/locationContribute/index.js

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function AdminLocationContribute(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const getAllLocations = async token => {
    setLoading(true);
    setError(null);
    await customAxios(token)
      .get('/locationContribute/all')
      .then(res => {
        setLocations(res.data.locations);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

<<<<<<< HEAD:src/components/Admin/contribute/locationContribute/index.js
    const getAllLocations = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get('/location_contribute/all').then(res => {
            setLocations(res.data.locations);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }
=======
  useEffect(() => {
    getAllLocations(token);
  }, [token]);
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e:src/components/Admin/report/locationContribute/index.js

  useEffect(() => {
    document.title = 'Admin - Địa điểm được đóng góp';
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">
            {locations.length} địa điểm du lịch được đóng góp
          </Typography>
        </div>
      </div>

<<<<<<< HEAD:src/components/Admin/contribute/locationContribute/index.js
    return (
        <Container className={classes.container}>
            <div className={classes.admin_location_header}>
                <div>
                    <Typography variant="h4">{locations.length} địa điểm du lịch được đóng góp</Typography>
                </div>
            </div>

            <Paper className={classes.paper}>
                <DataGrid
                    rows={locations}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pagination
                    onRowDoubleClick={(location) => {
                        history.push(`/admin/locationContribute/${location.row._id}`)
                    }}
                    autoHeight
                    loading={loading}
                    error={error}
                    getRowId={row => row._id}
                    disableSelectionOnClick
                    components={{
                        Toolbar: ExportToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
}
=======
      <Paper className={classes.paper}>
        <DataGrid
          rows={locations}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          pagination
          onRowDoubleClick={location => {
            history.push(`/admin/locationContribute/${location.row.name}`);
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
>>>>>>> a915721d8edf30278d0553b852d0106b75fb444e:src/components/Admin/report/locationContribute/index.js
