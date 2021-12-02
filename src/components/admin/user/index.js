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
        field: 'firstName',
        headerName: 'Họ',
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Tên',
        width: 150,
    },
    {
        field: 'birthday',
        headerName: 'Ngày sinh',
        width: 150,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 6, lastName: 'Melisandre', firstName: null, birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 14, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 15, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 16, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },
    { id: 17, lastName: 'Roxie', firstName: 'Harvey', birthday: '01/08/2000', phone: '0361111111', email: 'zsxdcfvgbhnj@gmail.com' },

];

function AdminUsers(props) {
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
                    <Typography>200 Người dùng</Typography>
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

export default AdminUsers;