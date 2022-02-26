import React, { useEffect, useState } from "react";
import { Container, IconButton, Tooltip } from "@material-ui/core";

import { Typography, Paper, Avatar } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { CheckCircle, Remove, Edit, Cancel, HourglassFull } from "@material-ui/icons";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";
import { useSelector } from "react-redux";
import { tableStyles } from "../../../style";


function ExportToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


const columns = [
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 130,
        sortable: false,
        renderCell: (user) => (
            <Avatar
                alt={user.row.username}
                src={user.row.avatar}
            />
        )
    },
    {
        field: 'fullname',
        headerName: 'Tên đầy đủ',
        width: 220,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
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
        valueGetter: (user) => user.row.role === 0 ? 'Bt' : user.row.role === 1 ? 'Co-op' : user.row.role === 2 ? 'Admin' : 'Unknown'
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 150,
        sortable: false,
        renderCell: (user) => user.row.confirmAccount?.confirmId ?
            user.row.confirmAccount.confirmId.state === 0 ? (
                <Tooltip title='Đang đợi xác thực'>
                    <HourglassFull style={{ color: '#ffc107' }} />
                </Tooltip>
            ) : user.row.confirmAccount.confirmId.state === 1 ? (
                <Tooltip title='Đã xác thực'>
                    <CheckCircle style={{ color: '#357a38' }} />
                </Tooltip>
            ) : (
                <Tooltip title='Đã từ chối'>
                    <Cancel style={{ color: '#ba000d' }} />
                </Tooltip>
            )
            : <Tooltip title='Chưa xác thực'>
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
                <Edit />
            </IconButton>
        )
    }
];





function AdminUsers(props) {
    const classes = tableStyles();
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
        <Container className={classes.container}>
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
                    components={{
                        Toolbar: ExportToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
}

export default AdminUsers;