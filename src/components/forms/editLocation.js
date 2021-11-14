import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';
import { getLocations } from "../../redux/callApi/locationCall";

const listLocation = [
    { id: "1", name: "Chùa Một Cột" },
    { id: "2", name: "Hồ Gươm" },
    { id: "3", name: "Lăng Chủ tịch" },
    { id: "4", name: "Vịnh Hạ Long" },
    { id: "5", name: "Biển Mỹ Khê" },
    { id: "6", name: "Biển Vũng Tàu" },
    { id: "7", name: "Biển Nha Trang" },
    { id: "8", name: "Phố cổ Hội An" },
    { id: "9", name: "Chùa Một Cột" },
    { id: "10", name: "Chùa Một Cột" },
    { id: "11", name: "Chùa Một Cột" },
    { id: "12", name: "Chùa Một Cột" },
    { id: "13", name: "Chùa Một Cột" },
]



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
        if (location.locations.length === 0) {
            dispatch(getLocations());
        }

    })

    // onEffect load listLocation

    const classes = formStyles();

    return (
        <Paper className={[classes.paperContainer, classes.addFormContainer]}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Chỉnh sửa địa điểm
                </Typography>
            </div>
            <form
                className={classes.addLocationForm}
            >
                <Autocomplete
                    id="choose-location"
                    options={location.locations}
                    getOptionLabel={(option) => option.locationName}
                    style={{ width: 400, marginTop: 30 }}
                    defaultValue={loc}
                    onChange={(e, value) => setLoc(value)}
                    renderInput={(params) => <TextField {...params} name="location" label="Địa điểm" variant="outlined" required defaultValue={loc.locationName} />}
                />
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