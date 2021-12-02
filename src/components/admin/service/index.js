import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

import { DataGrid } from "@mui/x-data-grid";


const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 120,
    },
    tableContainer: {
        height: 400,
        margin: 50,
        marginBottom: 100,
    },
    table: {
        backgroundColor: "white",
    },
    chart: {
        margin: 50,
    }
}))

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Tên dịch vụ',
        width: 150,
    },
    {
        field: 'price',
        headerName: 'Giá cả',
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Loại dịch vụ',
        width: 110,
    },
    {
        field: 'cooperator',
        headerName: 'Đối tác',
        width: 150,
    },
];

const rows = [
    { id: 1, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 2, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 3, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 4, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 5, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 6, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 7, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 8, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 9, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 10, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 11, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 12, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 13, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 14, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 15, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 16, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 17, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 18, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
    { id: 19, name: 'Service 1', price: "120$", type: "Hotel", cooperator: "Cooperator 1" },
];

function AdminService(props) {
    const classes = useStyles();
    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div className={classes.appBarSpacer} />
            <div className={classes.admin_location_header}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }}
            >
                <div className={classes.admin_location_header_left}>
                    <Typography>200 Dịch vụ liên kết</Typography>
                </div>
            </div>
            <div className={classes.admin_location_body}>
                <div className={classes.tableContainer}>
                    <DataGrid
                        className={classes.table}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </Container>
    );
}

export default AdminService;