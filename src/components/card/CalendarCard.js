import Calendar from "react-calendar";
import { Card } from "@material-ui/core";

import { calendarStyles } from "../../style";
import "./Calendar.css";

export default function calendar(props) {

    const classes = calendarStyles();
    return (
        <Card className={classes.container}>
            <Calendar />
            {/* <div id="amlich-month"></div> */}
        </Card>
    )
}