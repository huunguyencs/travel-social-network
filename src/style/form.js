
import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const formStyles = makeStyles((theme) => ({
    paperContainer: {
        padding: 20,
        borderRadius: attr.borderRadius.md,
    },
    formContainer: {
        padding: 30,
    },
    textTitle: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        width: "100%",
        padding: 10,
    },
    input: {
        backgroundColor: color.lightgray,
        width: "100%",
        padding: 15,
        borderRadius: attr.borderRadius.md,
        marginBottom: 20,
    }
}))

export default formStyles;