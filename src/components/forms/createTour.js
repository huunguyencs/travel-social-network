import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { Button, Paper, Typography } from "@material-ui/core";
import { formStyles } from "../../style";

export default function CreateTourForm(props) {

    const classes = formStyles();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Paper className={classes.paperContainer}>
            <div className={classes.textTitle}>
                <Typography variant="h5">
                    Tạo tour du lịch
                </Typography>
            </div>
            <form>
                <div className={classes.datepicker}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
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
                    <Button className={classes.button}>
                        Xong
                    </Button>
                </div>
            </form>
        </Paper>
    )
}