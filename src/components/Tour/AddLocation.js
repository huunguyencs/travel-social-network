import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle } from '@material-ui/icons';

export default function AddLocation(props) {

    const classes = formStyles();


    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, loc, setLoc, indexDate } = props;
    const [loading, setLoading] = useState(location.loadingLocations);
    const [locations, setLocations] = useState([]);

    const [state, setState] = useState({
        zoom: 8,
        center: { lat: 14.489055527436275, lng: 107.96608963227854 }
    });

    const changeLoc = (loc) => {
        if (loc) {
            setLoc(loc);
            setState({
                zoom: 12,
                center: {
                    lat: loc.position.lat,
                    lng: loc.position.lon
                }
            })
        }
    }

    useEffect(() => {
        setLoading(true);
        if (currentProvince) {
            setLocations(location.locations.filter(item => item.province._id === currentProvince._id));
            setState({
                zoom: 11,
                center: {
                    lat: currentProvince.position.lat,
                    lng: currentProvince.position.lon
                }
            })
        }
        setLoading(false);
    }, [currentProvince, location.locations]);

    const setProvince = (province) => {
        setCurrentProvince(province)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, indexDate: indexDate }))
    }

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thêm địa điểm
                </Typography>
            </div>
            <div
                className={classes.addLocationForm}
            >
                <div className={classes.center}>
                    <Autocomplete
                        id="choose-province"
                        options={location.provinces}
                        loading={location.loading}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => setProvince(value)}
                        value={currentProvince}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />
                </div>
                <div className={classes.center}>
                    <Autocomplete
                        id="choose-location"
                        options={locations}
                        loading={loading}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocomplete}
                        onChange={(e, value) => changeLoc(value)}
                        value={loc}
                        renderInput={(params) => <TextField {...params} name="location" label="Chọn địa điểm" variant="outlined" />}
                    />
                </div>
                <div>
                    <Button
                        className={classes.button}
                        type="submit"
                        onClick={handleSubmit}
                        startIcon={(<AddCircle />)}
                        disabled={!loc}
                    >
                        Thêm
                    </Button>
                </div>
                <AddLocMap
                    setLoc={setLoc}
                    currentProvince={currentProvince}
                    locations={locations}
                    state={state}
                    setState={setState}
                    indexDate={props.indexDate}
                />
            </div>
        </Paper>
    )
}
