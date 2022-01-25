import { makeStyles } from "@material-ui/core";
import color from "./color";

const addServiceStyles = makeStyles((theme) => ({
    root: {
        marginTop: 80,
        justifyContent: 'center',
        backgroundColor: color.white,
        paddingBottom: 30
    },
    formContainer: {
        marginBlock: 30,
        marginInline: 50
    },
    fullField: {
        width: "100%",
        marginBlock: 10
    },
    halfFeild: {
        width: "50%",
        marginBlock: 10
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 50
    }

}))

export default addServiceStyles;