import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const calendarStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        borderRadius: attr.borderRadius.md,
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    paperModal: {
        width: 500,
        backgroundColor: "#fff",
        borderRadius: attr.borderRadius.md,
        padding: 30,
        margin: "auto",
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30
    },
    button: {
        padding: 10,
        paddingInline: 30,
        backgroundColor: color.turquoise
    },
    modal: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }


}))

export default calendarStyles;