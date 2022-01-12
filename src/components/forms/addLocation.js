import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import customAxios from "../../utils/fetchData";


export default function AddLocationForm(props) {

    const classes = formStyles();

    const [isFetch, setIsFetch] = useState(false);
    const [loc, setLoc] = useState(null);

    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, handleClose, locations, setLocations, indexDate } = props;




    const getLocInit = async (province, setLocations) => {
        await customAxios().get(`/location/locations/${province._id}`)
            .then((req) => {
                setLocations(req.data.locations);
            }).catch(err => {
                setLocations([]);
            })
    }

    useEffect(() => {
        if (currentProvince && locations.length === 0 && isFetch) {
            getLocInit(currentProvince, setLocations)
            setIsFetch(true)
        }
    }, [currentProvince, locations, setLocations, isFetch, setIsFetch])

    const getLoc = async (province) => {
        if (province && province._id !== currentProvince) {
            setLoc(null);
            await customAxios().get(`/location/locations/${province._id}`)
                .then((req) => {
                    setLocations(req.data.locations);
                }).catch(err => {
                    setLocations([]);
                })
            setCurrentProvince(province);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, indexDate: indexDate }))
        handleClose();
    }


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
                <div className={classes.center}>
                    <Autocomplete
                        value={currentProvince}
                        id="choose-province"
                        options={location.provinces}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => getLoc(value)}
                        defaultValue={props.provinceCache}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />
                </div>
                <div className={classes.center}>
                    <Autocomplete
                        value={loc}
                        id="choose-location"
                        options={locations}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => setLoc(value)}
                        renderInput={(params) => <TextField {...params} name="location" label="Chọn địa điểm" variant="outlined" />}
                    />
                </div>
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