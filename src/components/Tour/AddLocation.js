import { Button, Paper, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { formStyles } from '../../style';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle } from '@material-ui/icons';

const filter = createFilterOptions();

export default function AddLocation(props) {

    const classes = formStyles();


    const dispatch = useDispatch();
    const { location } = useSelector(state => state);
    const { currentProvince, setCurrentProvince, indexDate } = props;
    const [loading, setLoading] = useState(location.loadingLocations);
    const [locations, setLocations] = useState([]);
    const [loc, setLoc] = useState(null);

    const [state, setState] = useState({
        zoom: 8,
        center: { lat: 14.489055527436275, lng: 107.96608963227854 }
    });

    const changeLoc = (loc) => {
        if (loc) {
            setLoc(loc);
            setState({
                zoom: 12,
                center: loc.position
            })
        }
    }

    useEffect(() => {
        setLoading(true);
        if (currentProvince) {
            setLocations(location.locations.filter(item => item.province._id === currentProvince._id));
            setState({
                zoom: 11,
                center: currentProvince.position
            })
        }
        setLoading(false);
    }, [currentProvince, location.locations]);

    const setProvince = (province) => {
        setCurrentProvince(province)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc) {
            if (loc._id) {
                dispatch(tourAction.addLocation({ location: loc, indexDate: indexDate }))
            }
            else {
                dispatch(tourAction.addLocation({ locationName: loc.fullname, indexDate: indexDate }))
            }
        }

    }

    return (
        <Paper className={classes.addLocationContainer}>
            <div
                className={classes.addLocationForm}
            >
                <div style={{ display: 'flex' }}>
                    <Autocomplete
                        id="choose-province"
                        options={location.provinces}
                        loading={location.loading}
                        getOptionLabel={(option) => option?.fullname}
                        className={classes.autocompleteProvince}
                        onChange={(e, value) => setProvince(value)}
                        value={currentProvince}
                        renderInput={(params) => <TextField {...params} name="provinces" label="Chọn tỉnh thành" variant="outlined" />}
                    />

                    <Autocomplete
                        id="choose-location"
                        options={locations}
                        loading={loading}
                        className={classes.autocompleteProvince}
                        onChange={(e, value) => {
                            if (typeof value === 'string') {
                                setLoc({
                                    fullname: value,
                                    image: ''
                                })
                            }
                            else if (value && value.inputValue) {
                                setLoc({
                                    fullname: value.inputValue,
                                    image: ''
                                })
                            }
                            else changeLoc(value)

                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    fullname: `Thêm ${params.inputValue}`
                                })
                            }
                            return filtered;
                        }}
                        freeSolo
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.fullname
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(option) => option.fullname}
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
                        style={{padding: 7, marginTop: 5}}
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
