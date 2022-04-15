import React, { useEffect, useState } from "react";
import { Container, IconButton } from "@material-ui/core";
import { Card, Grid, Typography, Box, CardHeader } from "@material-ui/core";
import { Paper, Avatar } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { CheckCircle, Remove, Edit, Cancel, HourglassFull } from "@material-ui/icons";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import customAxios from "../../../utils/fetchData";
import { useSelector } from "react-redux";
import { tableStyles } from "../../../style";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

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
        renderCell: (user) => user.row.confirmAccount ?
            user.row.confirmAccount.state === 0 ? (
                <Tooltip title='Đang đợi xác thực'>
                    <HourglassFull style={{ color: '#ffc107' }} />
                </Tooltip>
            ) : user.row.confirmAccount.state === 1 ? (
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

const data = [
    { month: "Jan", newuser: 0, user: 0 },
    { month: "Feb", newuser: 0, user: 0 },
    { month: "Mar", newuser: 0, user: 0 },
    { month: "Apr", newuser: 0, user: 0 },
    { month: "May", newuser: 0, user: 0 },
    { month: "Jun", newuser: 0, user: 0 },
    { month: "Jul", newuser: 0, user: 0 },
    { month: "Aug", newuser: 0, user: 0 },
    { month: "Sep", newuser: 0, user: 0 },
    { month: "Oct", newuser: 0, user: 0 },
    { month: "Nov", newuser: 0, user: 0 },
    { month: "Dec", newuser: 0, user: 0 },
]

function handlingDataUsers(arr) {
    arr.forEach(element => {
        let d = new Date(element.createdAt);
        let mon = d.getMonth();
        data.at(mon).user++;
        if (d.getFullYear() == (new Date()).getFullYear()) {
            data.at(mon).newuser++;
        }
        for (let i = 1; i <= 12; i++) {
            data.at(i).user += data.at(i - 1).user;
        }
    });
}

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
        await customAxios(token).get(`/user/all`).then(res => {
            setUsers(res.data.users);
            setLoading(false);
            //handlingDataUsers(res.data.users);
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

            <Grid>
                <Card>
                    <CardHeader title="Người tham gia" subheader="(+43%) so với tháng trước" />
                    <Box>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px"
                            }}>

                            <div
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    paddingTop: "20px",
                                    borderRadius: "15px",
                                    width: "90%",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <ResponsiveContainer className="chart" height={300}>
                                    <LineChart
                                        width={400}
                                        height={300}
                                        data={data}
                                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                    >
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="newuser" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="user" stroke="#ECCC68" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>


                    </Box>
                </Card>

            </Grid>

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