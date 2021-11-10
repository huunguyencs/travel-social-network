import { Button, Paper } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';

import * as tourAction from '../../redux/actions/tourAction';
import { useDispatch } from "react-redux";
import * as dateUtils from '../../utils/date';

export default function UpdateDateForm(props) {

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(dateUtils.convertStrToDate(props.currentDate));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tourAction.updateDate({ indexDate: props.indexDate, newDate: selectedDate }));
        props.handleClose();
    }

    return (
        <Paper>
            <div></div>
            <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        name="date"
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Thay đổi ngày"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Button onClick={handleSubmit} type="submit">
                    Xong
                </Button>
            </form>
        </Paper>
    )
}