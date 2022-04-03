import React from "react";
import { Container, Paper, Typography, Card, Grid, Button } from "@material-ui/core";
import { tableStyles } from "../../../style";
import { AddLocation, Report, Event } from "@material-ui/icons";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";

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
        headerName: 'Chi tiết',
        width: 150,
        sortable: false,
        renderCell: (location) => (
            <IconButton size='small' component={Link} to={`/admin/location/${location.row.name}`} title={'Chi tiết'}>
                <MoreVert />
            </IconButton>
        )
    }
]
export default function AdminLocationContribute() {

    const classes = tableStyles();

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
                        history.push(``)
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