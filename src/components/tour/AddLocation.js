import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces } from '../../redux/callApi/locationCall';
import { formStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';

export default function AddLocation(props) {

    const classes = formStyles();
    const [loc, setLoc] = useState(null);
    const dispatch = useDispatch();
    const { location } = useSelector(state => state);

    const [currentProvince, setCurrentProvince] = useState(null);
    const [locations, setLocations] = useState([]);

    const defaultState = {
        zoom: 9,
        center: { lat: 14.489055527436275, lng: 107.96608963227854 }
    }
    const [state, setState] = useState(defaultState);

    const changeLoc = (loc) => {
        setLoc(loc);
        setState({
            zoom: 12,
            center: {
                lat: loc.position.lat,
                lng: loc.position.lon
            }
        })
    }

    const getLoc = async (province) => {
        if (province && province._id !== currentProvince) {
            await customAxios().get(`location/locations/${province._id}`)
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

    useEffect(() => {
        if (location.provinces?.length === 0) {
            dispatch(getProvinces());
        }
    }, [dispatch, location.provinces])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, indexDate: props.indexDate }))
    }

    return (
        <div>
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
                        value={currentProvince}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Autocomplete
                        id="choose-location"
                        options={locations}
                        getOptionLabel={(option) => option?.fullname}
                        style={{ width: 400, marginTop: 30 }}
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
                    defaultState={defaultState}
                    indexDate={props.indexDate}
                />
            </form>
        </div>
    )
}
