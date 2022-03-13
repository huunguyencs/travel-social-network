import React, { useEffect, useState } from "react";
import { Container, Paper } from "@material-ui/core";


import Typography from '@material-ui/core/Typography';

import { tableStyles } from "../../../style";
import { getStar, totalNumRate } from "../../../utils/utils";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import customAxios from "../../../utils/fetchData";

const columns = [
    {
        field: 'name',
        headerName: 'Tên',
        width: 300,
    },
    {
        field: 'type',
        headerName: 'Loại',
        width: 250,
    },
    {
        field: 'cooperator',
        headerName: 'Sở hữu',
        width: 250,
        valueGetter: (service) => service.row.cooperator.fullname
    },
    {
        field: 'rate',
        headerName: 'Đánh giá (/5)',
        width: 200,
        valueGetter: (service) => getStar(service.row.star)
    },
    {
        field: 'numRate',
        headerName: 'Lượt đánh giá',
        width: 200,
        valueGetter: (service) => totalNumRate(service.row.star)
    }
];

function ExportToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}



function AdminServices(props) {
    const history = useHistory();
    const classes = tableStyles();
    const { token } = useSelector(state => state.auth);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    const getAllServices = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get(`/service/all`).then(res => {
            setServices(res.data.services);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    useEffect(() => {
        getAllServices(token);
    }, [token])

    useEffect(() => {
        document.title = 'Admin - Dịch vụ'
    })



    return (
        <Container className={classes.container}>
            <div className={classes.admin_location_header}
                style={{
                    display: 'flex',
                    paddingLeft: '50px'
                }}
            >

                <Typography variant="h4" gutterBottom>
                    {services.length} dịch vụ
                </Typography>
            </div>
            <Paper className={classes.paper}>
                <DataGrid
                    rows={services}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pagination
                    onRowDoubleClick={(e) => {
                        history.push(`/u/${e.row.cooperator._id}`)
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

export default AdminServices;