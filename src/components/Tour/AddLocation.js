import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle } from '@material-ui/icons';

export default function AddLocation(props) {

    const classes = formStyles();


    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, loc, setLoc, locations, setLocations, indexDate } = props;
    const [loading, setLoading] = useState(false);

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

    const getLocInit = async (province, setLocations, setState) => {
        setLoading(true)
        await customAxios().get(`/location/locations/${province._id}`)
            .then((res) => {
                setLocations(res.data.locations);
                setLoading(false);
            }).catch(err => {
                setLocations([]);
                setLoading(false);
            })
        setState({
            zoom: 11,
            center: {
                lat: province.position.lat,
                lng: province.position.lon
            }
        })
    }

    useEffect(() => {
        if (currentProvince && !locations) {
            getLocInit(currentProvince, setLocations, setState)
        }
    }, [currentProvince, locations, setState, setLocations])

    const getLoc = async (province) => {
        if (province && (!currentProvince || province._id !== currentProvince._id)) {
            setLoading(true);
            setLoc(null);
            await customAxios().get(`/location/locations/${province._id}`)
                .then((res) => {
                    setLocations(res.data.locations);
                    setLoading(false);
                }).catch(err => {
                    setLocations([]);
                    setLoading(false);
                })
            setCurrentProvince(province);
            setState({
                zoom: 11,
                center: {
                    lat: province.position.lat,
                    lng: province.position.lon
                }
            })
        }
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
                        onChange={(e, value) => getLoc(value)}
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
