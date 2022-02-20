import React, { useEffect, useState } from "react";
import { makeStyles, Container, IconButton, Tooltip } from "@material-ui/core";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from "react-router-dom";
import { CheckCircle, Remove, Visibility } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        marginTop: 120,
    },
    tableContainer: {
        // height: 400,
        // margin: 50,
        marginBottom: 100,
    },
    table: {
        backgroundColor: "white",
        // minWidth: 750,
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
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
        width: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
    {
        field: 'join',
        headerName: 'Ngày tham gia',
        width: 200,
        valueGetter: (user) => new Date(user.row.createdAt).toLocaleDateString('vi-VN')
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 130,
        renderCell: (user) => user.row.role === 0 ? 'Bt' : user.row.role === 1 ? 'Co-op' : user.row.role === 2 ? 'Admin' : 'Unknown'
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 150,
        sortable: false,
        renderCell: (user) => user.row.confirmAccount.state ? (
            <Tooltip title='Đã xác thực'>
                <CheckCircle style={{ color: '#357a38' }} />
            </Tooltip>
        ) : <Tooltip title='Chưa xác thực'>
            <Remove />
        </Tooltip>
    },
    {
        field: 'action',
        headerName: 'Chi tiết',
        width: 150,
        sortable: false,
        renderCell: (user) => (
            <IconButton size='small' component={Link} to={`/admin/user/${user.row._id}`} title='Chi tiết'>
                <Visibility />
            </IconButton>
        )
    }
];





function AdminUsers(props) {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useSelector(state => state.auth);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(10);


    const getAllUsers = async (token) => {
        setLoading(true);
        setError(null);
        await customAxios(token).get(`/user/get_all`).then(res => {
            setUsers(res.data.users);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError('Có lỗi xảy ra')
        })
    }

    useEffect(() => {
        getAllUsers(token);
    }, [token]);


    return (
        <Container className={classes.container} style={{ marginTop: "160px" }}>
            <div className={classes.appBarSpacer} />
            {
                users &&
                <div className={classes.admin_location_header}
                    style={{
                        display: "flex",
                        paddingLeft: "50px",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        {users.length} Người dùng
                    </Typography>
                </div>
            }


            <div className={classes.admin_location_body}>
                <div className={classes.tableContainer}>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <DataGrid
                                rows={users}
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 25]}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                pagination
                                onRowDoubleClick={(e) => {
                                    history.push(`/admin/user/${e.row._id}`)
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

export default AdminUsers;