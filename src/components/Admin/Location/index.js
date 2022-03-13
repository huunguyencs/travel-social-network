import React, { useEffect, useState } from "react";
import { Container, Button, IconButton } from "@material-ui/core";
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory } from "react-router-dom";
import { AddCircle, Edit } from "@material-ui/icons";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";
import { getStar, totalNumRate } from "../../../utils/utils";
import { tableStyles } from "../../../style";



const columns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 230,
    sortable: false,
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
    valueGetter: (location) => location.row.province.fullname
  },
  {
    field: 'star',
    headerName: 'Đánh giá (/5)',
    width: 175,
    valueGetter: (location) => getStar(location.row.star)
  },
  {
    field: 'numRate',
    headerName: 'Lượt đánh giá',
    width: 175,
    valueGetter: (location) => totalNumRate(location.row.star)
  },
  {
    field: 'action',
    headerName: 'Chỉnh sửa',
    width: 150,
    sortable: false,
    renderCell: (location) => (
      <IconButton size='small' component={Link} to={`/admin/location/${location.row.name}`} title={'Chỉnh sửa'}>
        <Edit />
      </IconButton>
    )
  }
]

function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}




function AdminLocations(props) {
  const history = useHistory();
  const classes = tableStyles();
  const { token } = useSelector(state => state.auth);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const getAllLocations = async (token) => {
    setLoading(true);
    setError(null);
    await customAxios(token).get('/location/get_all').then(res => {
      setLocations(res.data.locations);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setError(err);
    })
  }

  useEffect(() => {
    getAllLocations(token);
  }, [token])

  useEffect(() => {
    document.title = 'Admin - Địa điểm';
  }, [])

  return (
    <Container className={classes.container}>
      <div className={classes.admin_location_header}>
        <div>
          <Typography variant="h4">{locations.length} địa điểm du lịch</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.addBtn}
            startIcon={(
              <AddCircle />
            )}
            component={Link}
            to={`/admin/location/add`}
          >
            Thêm địa điểm
          </Button>
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
            history.push(`/admin/location/${location.row.name}`)
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

export default AdminLocations;