import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';

export default function AddLocation(props) {

    const classes = formStyles();

    const [isFetch, setIsFetch] = useState(false);

    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, loc, setLoc, locations, setLocations } = props;

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
        await customAxios().get(`/location/locations/${province._id}`)
            .then((req) => {
                setLocations(req.data.locations);
            }).catch(err => {
                setLocations([]);
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
        if (currentProvince && locations.length === 0 && isFetch) {
            getLocInit(currentProvince, setLocations, setState)
            setIsFetch(true)
        }
    }, [currentProvince, locations, setState, setLocations, isFetch, setIsFetch])

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
            dispatch(tourAction.addLocation({ location: loc, indexDate: props.indexDate }))
    }

    return (
        <>
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
                        id="choose-province"
                        options={location.provinces}
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
                    >
                        Thêm
                    </Button>
                </div>
                <AddLocMap
                    setLoc={setLoc}
                    currentProvince={currentProvince}
                    setCurrentProvince={setCurrentProvince}
                    locations={locations}
                    provinces={locations.provinces}
                    state={state}
                    setState={setState}
                    indexDate={props.indexDate}
                />
            </form>
        </>
    )
}
