import { Button, Chip, CircularProgress, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { ArrowBack, Update } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFound } from '../../../page/404';
import { adminStyles } from '../../../style';
import customAxios from '../../../utils/fetchData';



export default function DetailProvinceAdmin() {


    const classes = adminStyles();

    const { subpage } = useParams();
    const [province, setProvince] = useState(null);
    const [state, setState] = useState({
        loading: false,
        error: false,
    });
    const [notFound, setNotFound] = useState(false);
    const [tempFood, setTempFood] = useState('');


    const getProvince = async (id) => {
        if (id) {
            setState({
                loading: true,
                error: false
            })
            setNotFound(false);
            await customAxios().get(`/province/${id}`).then(res => {
                setProvince(res.data.province);
                setState({
                    loading: false,
                    error: false,
                })
            }).catch(err => {
                if (err.response && err.response.status === 404)
                    setNotFound(true);
                else
                    setState({
                        loading: false,
                        error: true
                    })
            });
        }
    }

    useEffect(() => {
        if (subpage) {
            getProvince(subpage);
        }
    }, [subpage])

    useEffect(() => {
        if (province && province.fullname) {
            document.title = 'Chỉnh sửa ' + province.fullname;
        }
    }, [province])

    const handleChange = (e) => {
        setProvince(province => ({
            ...province,
            [e.target.name]: e.target.value
        }))
    }

    const changePosition = (e) => {
        setProvince(province => ({
            ...province,
            position: {
                ...province.position,
                [e.target.name]: e.target.value
            }
        }))
    }

    const handleAddFood = (e) => {
        e.preventDefault();
        setTempFood('');
        setProvince(province => ({
            ...province,
            detail: {
                ...province.detail,
                food: [...province.detail.food, tempFood]
            }
        }))
    }

    const handleRemoveFood = (idx) => {
        setProvince(province => ({
            ...province,
            detail: {
                ...province.detail,
                food: [
                    ...province.detail.food.slice(0, idx),
                    ...province.detail.food.slice(idx + 1),
                ]
            }
        }))
    }

    const handleChangeOverview = (e) => {
        setProvince(province => ({
            ...province,
            detail: {
                ...province.detail,
                overview: {
                    ...province.detail.overview,
                    [e.target.name]: e.target.value
                }
            }
        }))
    }

    const handleChangeVehicle = (e) => {
        setProvince(province => ({
            ...province,
            detail: {
                ...province.detail,
                vehicle: {
                    ...province.detail.vehicle,
                    [e.target.name]: e.target.value
                }
            }
        }))
    }

    const handleUpdate = () => {

    }

    return (
        <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
            <IconButton component={Link} to={`/admin/province`} title="Quay lại">
                <ArrowBack />
            </IconButton>
            {
                notFound ? <NotFound /> :
                    state.loading ?
                        <div>
                            <CircularProgress />
                        </div> :
                        state.error ?
                            <div>
                                Lỗi
                            </div> :
                            province &&
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
                                    <Typography variant='h4'>Chỉnh sửa thông tin cho {province.fullname}</Typography>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', marginRight: 20 }}>
                                        <TextField
                                            label="Tên"
                                            variant='outlined'
                                            name='name'
                                            onChange={handleChange}
                                            value={province.name}
                                            className={classes.fullField}
                                            required
                                        />
                                    </div>
                                    <div style={{ width: '50%', marginLeft: 20 }}>
                                        <TextField
                                            label="Tên đầy đủ"
                                            variant='outlined'
                                            name='fullname'
                                            onChange={handleChange}
                                            value={province.fullname}
                                            className={classes.fullField}
                                            required
                                        />
                                    </div>
                                </div>



                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%', marginRight: 20 }}>
                                        <TextField
                                            label="Vĩ độ"
                                            variant='outlined'
                                            name='lat'
                                            multiline
                                            onChange={changePosition}
                                            value={province.position.lat}
                                            className={classes.fullField}
                                            required
                                        />
                                    </div>
                                    <div style={{ width: '50%', marginLeft: 20 }}>
                                        <TextField
                                            label="Kinh độ"
                                            variant='outlined'
                                            name='lon'
                                            multiline
                                            onChange={changePosition}
                                            value={province.position.lon}
                                            className={classes.fullField}
                                            required
                                        />
                                    </div>
                                </div>
                                <TextField
                                    label="Thông tin"
                                    variant='outlined'
                                    name='information'
                                    multiline
                                    onChange={handleChange}
                                    value={province.information}
                                    className={classes.fullField}
                                    required
                                />
                                <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                                    <Typography variant='h5'>Chi tiết:</Typography>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Typography variant='h6'>Tổng quan</Typography>
                                    <TextField
                                        label="Văn hóa"
                                        variant='outlined'
                                        name='cultural'
                                        multiline
                                        onChange={handleChangeOverview}
                                        value={province.detail.overview.cultural}
                                        className={classes.fullField}
                                    />
                                    <TextField
                                        label="Địa lý"
                                        variant='outlined'
                                        name='geography'
                                        multiline
                                        onChange={handleChangeOverview}
                                        value={province.detail.overview.geography}
                                        className={classes.fullField}
                                    />
                                    <TextField
                                        label="Thời tiết"
                                        variant='outlined'
                                        name='weather'
                                        multiline
                                        onChange={handleChangeOverview}
                                        value={province.detail.overview.weather}
                                        className={classes.fullField}
                                    />
                                </div>
                                <div>
                                    <Typography variant='h6'>Phương tiện</Typography>
                                    <TextField
                                        label="Sân bay"
                                        variant='outlined'
                                        name='airport'
                                        multiline
                                        onChange={handleChangeVehicle}
                                        value={province.detail.vehicle.airport}
                                        className={classes.fullField}
                                    />
                                    <TextField
                                        label="Phương tiện giao thông"
                                        variant='outlined'
                                        name='traffic'
                                        multiline
                                        onChange={handleChangeVehicle}
                                        value={province.detail.vehicle.traffic}
                                        className={classes.fullField}
                                    />
                                </div>
                                <div>
                                    <Typography variant='h6'>Ẩm thực</Typography>
                                    {province.detail.food.map((item, index) => (
                                        <Chip key={index} label={item} onDelete={() => handleRemoveFood(index)} style={{ margin: 5 }} />
                                    ))}
                                    <form
                                        onSubmit={handleAddFood}
                                        className={classes.formAdd}
                                    >
                                        <TextField
                                            label={"Thêm ẩm thực"}
                                            variant="outlined"
                                            name="menu"
                                            className={classes.fullField}
                                            onChange={(e) => setTempFood(e.target.value)}
                                            value={tempFood}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!tempFood}
                                            variant='contained'
                                            color="primary"
                                        >
                                            Thêm
                                        </Button>
                                    </form>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'right', margin: 30 }}>
                                    <Button
                                        startIcon={(
                                            <Update />
                                        )}
                                        onClick={handleUpdate}
                                        color='primary'
                                        variant="contained"
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </>
            }

        </Paper>
    )
}
