import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from "react-redux";
import 'date-fns';
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { formStyles } from "../../style";
import { createTour } from '../../redux/actions/createTourAction';
import LoginModal from "../Modal/Login";


export default function CreateTourForm(props) {

    const { auth } = useSelector(state => state);

    const history = useHistory();

    const dispatch = useDispatch();

    const classes = formStyles();

    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleTextChange = (text) => {
        if (error) setError(false);
        setName(text.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (name !== "") {
            dispatch(createTour({ name: name, date: selectedDate }));
            history.push("/createtour");
        }
        else setError(true);
    }

    return (
        <>
            {auth.token ?
                <Paper className={classes.paperContainer}>
                    <div className={classes.textTitle}>
                        <Typography variant="h5">
                            Tạo tour du lịch
                        </Typography>
                    </div>
                    <div>
                        <div className={classes.nameTourInput}>
                            <TextField
                                label="Tên tour"
                                variant="outlined"
                                name="tourname"
                                required
                                style={{ width: "100%" }}
                                value={name}
                                onChange={handleTextChange}
                                error={error}
                                helperText={error ? 'Vui lòng điền tên tour' : ''}
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
                        <div className={classes.center}>
                            <Button className={classes.button} onClick={handleClick}>
                                Tạo
                            </Button>
                        </div>
                    </div>
                </Paper>
                : <LoginModal />
            }
        </>
    )
}