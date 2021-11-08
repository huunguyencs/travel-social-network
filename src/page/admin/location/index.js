import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import LeftBar from "../../../components/leftbar/LeftBar";
import { adminListMenu } from "../../../constant/adminMenu";
import { AddCircle } from "@material-ui/icons";

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
        headerName: 'Tên',
        width: 150,
    },
    {
        field: 'provice',
        headerName: 'Tỉnh',
        width: 150,
    },
    {
        field: 'numReview',
        headerName: 'Số lượng bài đánh giá',
        width: 150,
    },
    {
        field: 'star',
        headerName: 'Đánh giá',
        width: 150,
    },

];

const rows = [
    { id: 1, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 2, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 3, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 4, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 5, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 6, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 7, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 8, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 9, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 10, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 11, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 12, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 13, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 14, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 15, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 16, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 17, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
    { id: 18, name: 'Hồ Hoàn Kiếm', provice: 'Hà Nội', numReview: 10, star: 4.5},
];



export default function AdminUsers(props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item md={3}>
                <LeftBar menuList={adminListMenu} />
            </Grid>
            <Grid item md={9}>
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
                        <Typography>200 Địa điểm du lịch</Typography>
                    </div>
                    <div className={classes.admin_location_header_right}>
                        <Button variant="contained"
                        style={{
                            backgroundColor: "#179250",
                            borderRadius: "10px",
                        }}
                        >
                            <AddCircle></AddCircle>
                            <Typography>Thêm địa điểm</Typography>
                        </Button>
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
            </Grid>
        </Grid>
    )
}