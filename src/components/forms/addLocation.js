import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { formStyles } from '../../style';
import * as tourAction from '../../redux/actions/tourAction';

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


export default function AddLocationForm(props) {

    const [loc, setLoc] = useState({});
    const costRef = useRef('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tourAction.addLocation({ location: loc, cost: costRef.current.value, indexDate: props.indexDate }))
        props.handleClose();
    }


    // onEffect load listLocation

    const classes = formStyles();

    return (
        <Paper className={[classes.paperContainer, classes.addFormContainer]}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Thêm địa điểm
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
                    onChange={(e, value) => setLoc(value)}
                    renderInput={(params) => <TextField {...params} name="location" label="Địa điểm" variant="outlined" required />}
                />
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