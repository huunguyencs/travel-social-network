import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import { getProvinces } from "../../redux/callApi/locationCall";
import customAxios from "../../utils/fetchData";


export default function AddLocationForm(props) {

    const [loc, setLoc] = useState(null);
    const [currentProvince, setCurrentProvince] = useState('');
    const costRef = useRef('');

    const { location } = useSelector(state => state);
    const [locations, setLocations] = useState([]);

    const getLoc = async (province) => {
        if (province && province._id !== currentProvince) {
            await customAxios().get(`location/locations/${province._id}`)
                .then((req) => {
                    console.log(req.data);
                    setLocations(req.data.locations);
                }).catch(err => {
                    setLocations([]);
                })
            setCurrentProvince(province._id);
        }
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, cost: costRef.current.value, indexDate: props.indexDate }))
        props.handleClose();
    }

    useEffect(() => {
        if (location.provinces?.length === 0) {
            dispatch(getProvinces());
        }
    }, [dispatch, location.provinces])

    const classes = formStyles();

    return (
        <Paper className={`${classes.paperContainer} ${classes.addFormContainer}`}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thêm địa điểm
                </Typography>
            </div>
            <form
                className={classes.addLocationForm}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Autocomplete
                        id="choose-province"
                        options={location.provinces}
                        getOptionLabel={(option) => option?.fullname}
                        style={{ width: 400, marginTop: 30 }}
                        onChange={(e, value) => getLoc(value)}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Autocomplete
                        id="choose-location"
                        options={locations}
                        getOptionLabel={(option) => option?.fullname}
                        style={{ width: 400, marginTop: 30 }}
                        onChange={(e, value) => setLoc(value)}
                        renderInput={(params) => <TextField {...params} name="location" label="Chọn địa điểm" variant="outlined" />}
                    />
                </div>
                <TextField
                    label="Chi phí dự kiến (nghìn VND)"
                    variant="outlined"
                    name="cost"
                    className="form-input"
                    style={{ width: 400, marginTop: 30 }}
                    type="number"
                    inputRef={costRef}
                />
                <div>
                    <Button
                        className={classes.button}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Xong
                    </Button>
                </div>
            </form>
        </ Paper >
    )
}