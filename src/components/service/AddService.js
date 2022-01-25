import { FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import { addServiceStyles } from '../../style';
import AddImageHorizontal from '../input/addImageHorizontal';
import MapPicker from '../input/mapPicker';

export function BasicServiceInfo(props) {

    const classes = addServiceStyles();

    const { location } = useSelector(state => state)

    const { images, setImages, context, setContext } = props;

    const handleChange = (e) => {
        setContext({
            ...context,
            [e.target.name]: e.target.value
        })
    }

    const changeProvince = (province) => {
        setContext({
            ...context,
            province: province
        })
    }

    // const changePosition = (position) => {
    //     setContext(state => ({
    //         ...state,
    //         position: {
    //             ...state.position,
    //             lat: position.lat,
    //             lon: position.lng
    //         }
    //     }))
    // }


    return (
        <div className={classes.formContainer}>
            <TextField
                label="Tên dịch vụ"
                variant="outlined"
                name="name"
                required
                className={classes.fullField}
                onChange={handleChange}
                value={context.name}
            />
            <AddImageHorizontal
                images={images}
                onChange={setImages}
                className={classes.fullField}
            />
            <label htmlFor='type'>Loại dịch vụ</label>
            <RadioGroup
                id="type"
                row
                aria-label='service-type'
                name="type"
                className={classes.fullField}
                onChange={handleChange}
                value={context.type}
            >
                <FormControlLabel value="nhahang" control={<Radio color="primary" />} label="Nhà hàng" />
                <FormControlLabel value="khachsan" control={<Radio color="primary" />} label="Khách sạn" />
                <FormControlLabel value="dichuyen" control={<Radio color="primary" />} label="Di chuyển" />
                <FormControlLabel value="khac" control={<Radio color="primary" />} label="Khác" />
            </RadioGroup>
            <TextField
                label="Mô tả dịch vụ"
                variant="outlined"
                name="description"
                multiline
                className={classes.fullField}
                onChange={handleChange}
                value={context.description}
            />
            <TextField
                label="Liên hệ"
                variant="outlined"
                name='contact'
                multiline
                className={classes.fullField}
                onChange={handleChange}
                value={context.contact}
            />
            <TextField
                label="Khoảng chi phí"
                variant="outlined"
                name="cost"
                className={classes.fullField}
                onChange={handleChange}
                value={context.cost}
            />
            <TextField
                label="Địa chỉ"
                variant="outlined"
                name="andress"
                className={classes.fullField}
                onChange={handleChange}
                value={context.andress}

            />
            <div style={{ height: 400 }}>
                <MapPicker />
            </div>
            <Autocomplete
                id="province"
                options={location.provinces}
                getOptionLabel={(option) => option?.fullname}
                renderInput={(params) => <TextField {...params} name="province" label="Chọn tỉnh thành" variant="outlined" />}
                className={classes.fullField}
                onChange={(e, value) => changeProvince(value)}
                value={context.province}
            />
        </div>
    )
}

export function DetailServiceInfo(props) {

    const classes = addServiceStyles();

    const { detail, setDetail } = props;

    const handleChange = (e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={classes.formContainer}>
            <TextField
                label="Phù hợp"
                variant="outlined"
                name="conform"
                className={classes.fullField}
                multiline
                onChange={handleChange}
                value={detail.conform}
            />
            <TextField
                label="Đặc trưng"
                variant="outlined"
                name="featured"
                className={classes.fullField}
                multiline
                onChange={handleChange}
                value={detail.featured}
            />
        </div>
    )
}