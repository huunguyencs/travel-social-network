import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import { getLocations } from "../../redux/callApi/locationCall";


export default function EditLocationForm(props) {

    // const idRef = useRef(props.locationId);
    const [loc, setLoc] = useState(props.location.location);
    const costRef = useRef('');

    const dispatch = useDispatch();
    const { location } = useSelector(state => state);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tourAction.updateLocation({ indexDate: props.indexDate, indexLocation: props.indexLocation, location: loc, cost: costRef.current.value }))
        props.handleClose();
        props.handleCloseParent();
    }

    useEffect(() => {
        if (location.locations?.length === 0) {
            dispatch(getLocations());
        }

    }, [location.locations, dispatch])

    // onEffect load listLocation

    const classes = formStyles();

    return (
        <Paper className={`${classes.paperContainer} ${classes.addFormContainer}`}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Chỉnh sửa địa điểm
                </Typography>
            </div>
            <form
                className={classes.addLocationForm}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Autocomplete
                        id="choose-location"
                        options={location.locations}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 400, marginTop: 30 }}
                        defaultValue={loc}
                        onChange={(e, value) => setLoc(value)}
                        renderInput={(params) => <TextField {...params} name="location" label="Địa điểm" variant="outlined" required defaultValue={loc?.locationName} />}
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
                    defaultValue={props.location.cost}
                />
                <div>
                    <Button
                        className={classes.addLocationSubmit}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Xong
                    </Button>
                </div>
            </form>
        </Paper >
    )
}