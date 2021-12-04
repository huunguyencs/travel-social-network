import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import { getLocations } from "../../redux/callApi/locationCall";



export default function AddLocationForm(props) {

    const [loc, setLoc] = useState(null);
    const costRef = useRef('');

    const { location } = useSelector(state => state);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc)
            dispatch(tourAction.addLocation({ location: loc, cost: costRef.current.value, indexDate: props.indexDate }))
        props.handleClose();
    }

    useEffect(() => {
        if (location.locations?.length === 0) {
            dispatch(getLocations());
        }
    }, [dispatch, location.locations])

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
                        id="choose-location"
                        options={location.locations}
                        getOptionLabel={(option) => option?.name}
                        style={{ width: 400, marginTop: 30 }}
                        onChange={(e, value) => setLoc(value)}
                        renderInput={(params) => <TextField {...params} name="location" label="Địa điểm" variant="outlined" required />}
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