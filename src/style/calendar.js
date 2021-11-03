import { makeStyles } from "@material-ui/core";
import attr from "./attr";

const calendarStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        borderRadius: attr.borderRadius.md,
    }

}))

export default calendarStyles;