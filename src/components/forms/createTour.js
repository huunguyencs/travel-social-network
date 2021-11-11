import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from "react-redux";
import 'date-fns';
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { formStyles } from "../../style";
import * as tourAction from '../../redux/actions/createTourAction';
import { useHistory } from "react-router-dom";

export default function CreateTourForm(props) {

    const history = useHistory();

    const dispatch = useDispatch();

    const classes = formStyles();

    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleTextChange = (text) => {
        setName(text.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        // dispatch(tourAction.resetTour());
        dispatch(tourAction.createTour({ name: name, date: selectedDate }));
        history.push("/createtour");
    }

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Tạo tour du lịch
                </Typography>
            </div>
            <form>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <TextField
                        label="Tên tour"
                        variant="outlined"
                        name="tourname"
                        required
                        style={{ width: "100%" }}
                        value={name}
                        onChange={handleTextChange}
                    />
                </div>
                <div className={classes.datepicker}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            name="date"
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Chọn ngày khởi hành"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <Button className={classes.button} onClick={handleClick} type="submit">
                        Tạo
                    </Button>
                </div>
            </form>
        </Paper>
    )
}