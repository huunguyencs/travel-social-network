import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

import { DataGrid } from "@mui/x-data-grid";


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Tên',
        width: 150,
    },
    {
        field: 'user',
        headerName: 'Người sáng lập',
        width: 150,
    },
    {
        field: 'date',
        headerName: 'Thời gian thành lập',
        width: 150,
    },
    {
        field: 'numMenber',
        headerName: 'Số lượng thành viên',
        width: 150,
    },
    {
        field: 'numPost',
        headerName: 'Số lượng bài viết',
        width: 150,
    },
];

const rows = [
    { id: 1, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 2, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 3, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 4, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 5, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 6, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 7, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 8, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 9, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 10, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 11, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 12, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 13, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 14, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 15, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 16, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 17, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 18, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 19, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
    { id: 20, name: 'Du lịch cùng ABC', user: 'Trần Văn A', date: 'Mon Nov 08 2021 12:55:31 GMT+0700 (Giờ Đông Dương)', numMenber: 100, numPost: 100 },
];

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

function AdminGroup(props) {
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
                    <Typography>200 nhóm du lịch</Typography>
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

export default AdminGroup;