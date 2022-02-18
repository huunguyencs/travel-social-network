import React, { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core';

import { adminStyles } from '../../../style';
import AddImageHorizontal from '../../Input/AddImageHorizontal';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProvinces } from '../../../redux/callApi/locationCall';


export default function FormLocationAdmin(props) {

    const classes = adminStyles();

    // const { provinces } = useSelector(state => state.location);
    // const dispatch = useDispatch();

    const { location, setLocation, mode, handleSubmit } = props;
    const [errors, setErrors] = useState({});
    const [imgs, setImgs] = useState(location?.images || []);

    const handleChange = (e) => {
        setLocation(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const changePosition = (e) => {
        setLocation(state => ({
            ...state,
            position: {
                ...state.position,
                [e.target.name]: e.target.value
            }
        }))
    }

    // useEffect(() => {
    //     if (provinces.length === 0) {
    //         dispatch(getProvinces())
    //     }
    // }, [provinces.length, dispatch])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
                <Typography variant='h4'>{mode === 'edit' ? 'Chỉnh sửa thông tin địa điểm' : 'Thêm địa điểm'}</Typography>
            </div>
            <div>
                <TextField
                    label="Tên"
                    variant='outlined'
                    name='name'
                    onChange={handleChange}
                    value={location.name}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                />
                <TextField
                    label="Tên đầy đủ"
                    variant='outlined'
                    name='fullname'
                    onChange={handleChange}
                    value={location.fullname}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.fullname)}
                    helperText={errors?.fullname}
                />

                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', marginRight: 20 }}>
                        <TextField
                            label="Vĩ độ"
                            variant='outlined'
                            name='lat'
                            multiline
                            onChange={changePosition}
                            value={location.position.lat}
                            className={classes.fullField}
                            required
                            error={Boolean(errors?.position?.lat)}
                            helperText={errors?.position?.lat}
                        />
                    </div>
                    <div style={{ width: '50%', marginLeft: 20 }}>
                        <TextField
                            label="Kinh độ"
                            variant='outlined'
                            name='lon'
                            multiline
                            onChange={changePosition}
                            value={location.position.lon}
                            className={classes.fullField}
                            required
                            error={Boolean(errors?.position?.lon)}
                            helperText={errors?.position?.lon}
                        />
                    </div>

                </div>
                {/* <Autocomplete
                    id='set-province'
                    options={provinces}
                    value={}
                /> */}
                <AddImageHorizontal
                    images={imgs}
                    onChange={setImgs}
                    maxImage={10}
                />
                <TextField
                    label="Thông tin"
                    variant='outlined'
                    name='information'
                    multiline
                    onChange={handleChange}
                    value={location.information}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.information)}
                    helperText={errors?.information}
                />
            </div>
            <div className={classes.btnRight}>
                <Button onClick={handleSubmit}>Xong</Button>
            </div>
        </>
    )
}
