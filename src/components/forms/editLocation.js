import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/createTourAction';

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
    const [loc, setLoc] = useState({ id: props.locationInfo.id, name: props.locationInfo.location });
    const costRef = useRef('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tourAction.updateLocation({ indexDate: props.indexDate, indexLocation: props.indexLocation, location: loc, cost: costRef.current.value }))
        props.handleClose();
        props.handleCloseParent();
    }


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
                    options={listLocation}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400, marginTop: 30 }}
                    defaultValue={loc}
                    onChange={(e, value) => setLoc(value)}
                    renderInput={(params) => <TextField {...params} name="location" label="Địa điểm" variant="outlined" required defaultValue={props.locationInfo.location} />}
                />
                <TextField
                    label="Chi phí dự kiến (nghìn VND)"
                    variant="outlined"
                    name="cost"
                    className="form-input"
                    style={{ width: 400, marginTop: 30 }}
                    type="number"
                    inputRef={costRef}
                    defaultValue={props.locationInfo.cost}
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