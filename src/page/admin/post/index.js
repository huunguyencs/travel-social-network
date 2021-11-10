import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Card, Grid, makeStyles } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import Menu from "../../../components/leftbar/menu";

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
        field: 'user',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 150,
    },
    {
        field: 'content',
        headerName: 'Nội dung',
        width: 150,
    },

];

const rows = [
    { id: 1, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 2, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 3, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 4, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 5, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 6, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 7, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 8, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 9, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 10, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 11, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 12, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 13, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 14, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
    { id: 15, user: 'Trần Văn An', time: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', content: 'Nội dung' },
];



export default function AdminUsers(props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar >
                    <Menu menuList={adminListMenu} />
                </LeftBar>
            </Grid>
            <Grid item md={9}>
                <div className={classes.appBarSpacer} />
                <div className={classes.chart}>
                    <Card style={{ height: 400 }}>
                        Biểu đồ
                    </Card>
                </div>
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
            </Grid>
        </Grid>
    )
}