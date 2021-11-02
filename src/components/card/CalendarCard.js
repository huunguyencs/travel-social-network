import "./Calendar.css";

import Calendar from "react-calendar";
import { Card } from "@material-ui/core";
import { calendarStyles } from "../../style";

export default function calendar(props) {

    const classes = calendarStyles();
    return (
        <Card className={classes.container}>
            <Calendar />
        </Card>
    )
}