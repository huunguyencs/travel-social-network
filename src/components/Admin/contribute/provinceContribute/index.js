import React, { useEffect, useState } from "react";
import { Container, IconButton } from "@material-ui/core";
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MoreVert } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import customAxios from "../../../../utils/fetchData";
import { tableStyles } from "../../../../style";

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        width: 300,
        sortable: false,
    },
    {
        field: 'name',
        headerName: 'Tên',
        width: 200,
    },
    {
        field: 'fullname',
        headerName: 'Tên đầy đủ',
        width: 300,
    },
    {
        field: 'action',
        headerName: 'Chỉnh sửa',
        width: 180,
        sortable: false,
        renderCell: (province) => (
            <IconButton size='small' component={Link} to={`/admin/provinceContribute/${province.row.name}`} title='Chỉnh sửa'>
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

export default function AdminProvinceContribute(props) {

    const history = useHistory();
    const classes = tableStyles();
    const { token } = useSelector(state => state.auth);

    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    const getAllProvinces = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get('/province_contribute/all').then(res => {
            setProvinces(res.data.provinces);
            setProvinces([]);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    useEffect(() => {
        getAllProvinces(token);
    }, [token])

    useEffect(() => {
        document.title = "Admin - Địa điểm được đóng góp"
    }, [])

    return (
        <Container className={classes.container}>
            <div className={classes.admin_location_header}>
                <div>
                    <Typography variant="h4">{provinces.length} tỉnh/thành được đóng góp</Typography>
                </div>
            </div>

            <Paper className={classes.paper}>
                <DataGrid
                    rows={provinces}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pagination
                    onRowDoubleClick={(location) => {
                        history.push(`/admin/locationContribute/${location.row.name}`)
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