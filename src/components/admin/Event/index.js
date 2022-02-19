import React, { useEffect, useState } from "react";
import { makeStyles, Container, Button, IconButton } from "@material-ui/core";
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Link, useHistory } from "react-router-dom";
import { AddCircle, Edit } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "160px",
        marginBottom: 20
    },
    admin_location_header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: 20
    },
    addBtn: {
        backgroundColor: "#179250",
        borderRadius: "10px",
    }
}))


const columns = [
    {
        field: '_id',
        headerName: 'ID',
        width: 200,
        sortable: false,
    },
    {
        field: 'fullname',
        headerName: 'Tên đầy đủ',
        width: 350
    },
    {
        field: 'province',
        headerName: 'Tỉnh',
        width: 200,
        valueGetter: (event) => event.row.provinceId?.fullname || 'All'
    },
    {
        field: 'time',
        headerName: 'Thời gian',
        width: 150,
    },
    {
        field: 'calendar',
        headerName: 'Lịch',
        width: 150,
        valueGetter: (event) => event.row.calendarType ? 'DL' : 'AL'
    },
    {
        field: 'action',
        headerName: 'Chỉnh sửa',
        width: 150,
        sortable: false,
        renderCell: (event) => (
            <IconButton size='small' component={Link} to={`/admin/event/${event.row.name}`}>
                <Edit />
            </IconButton>
        )
    }
]


export default function AdminEvent() {
    const history = useHistory();
    const classes = useStyles();
    const { token } = useSelector(state => state.auth);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    const getAllEvents = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get('/event/get_all').then(res => {
            setEvents(res.data.events);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    useEffect(() => {
        getAllEvents(token);
    }, [token])

    useEffect(() => {
        document.title = 'Admin - Sự kiện'
    }, [])
    return (
        <Container className={classes.container}>
            <div
                className={classes.admin_location_header}
            >
                <div className={classes.admin_location_header_left}>
                    <Typography variant="h4">{events.length} Địa điểm du lịch</Typography>
                </div>
                <div className={classes.admin_location_header_right}>
                    <Button
                        variant="contained"
                        className={classes.addBtn}
                        startIcon={(
                            <AddCircle />
                        )}
                        component={Link}
                        to={`/admin/event/add`}
                    >
                        <Typography>Thêm sự kiện</Typography>
                    </Button>
                </div>
            </div>


            <div className={classes.admin_location_body}>
                <div className={classes.tableContainer}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <DataGrid
                                rows={events}
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 25]}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                pagination
                                onRowDoubleClick={(event) => {
                                    history.push(`/admin/location/${event.row.name}`)
                                }}
                                autoHeight
                                loading={loading}
                                error={error}
                                getRowId={row => row._id}
                                disableSelectionOnClick
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </Container>
    );
}
