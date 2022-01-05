
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
    formAction: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        // width: "100%",
        backgroundColor: color.turquoise,
        padding: 10,
        paddingInline: 30,
        marginBlock: 20
    },
    hashtag: {
        width: "100%",
        marginBottom: 15,
    },
    postContentInput: {
        width: "500px",
    },
    input: {
        backgroundColor: color.lightgray,
        width: "100%",
        padding: 15,
        borderRadius: attr.borderRadius.md,
        marginBottom: 20,
    },
    formCreateReview: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    },
    addLocationForm: {
        textAlign: "center",
    },
    addFormContainer: {
        paddingBottom: 30,
    },
    addLocationSubmit: {
        margin: 20,
        paddingInline: 30,
        backgroundColor: color.turquoise,
    },
    datepicker: {
        marginInline: 50,
        marginBottom: 30,
    },
    tourNameInput: {
        width: "100%",
        marginBottom: 20,
    }
}))

export default formStyles;