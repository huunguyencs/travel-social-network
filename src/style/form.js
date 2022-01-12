
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
    },
    center: {
        display: "flex",
        justifyContent: "center"
    },
    autocomplete: {
        width: 400,
        marginTop: 30
    },
    imageInputContainer: {
        marginInline: "20px",
        maxWidth: "500px"
    },
    imageInput: {
        width: "150px",
        height: "150px",
        margin: "5px",
        position: "relative",
        cursor: "pointer"
    },
    nameTourInput: {
        display: "flex",
        justifyContent: "center",
        marginTop: 20
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        marginTop: 10
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bodyChangeImage: {
        padding: 10,
    },
    imageChange: {
        height: "350px",
    },
    borderDash: {
        border: '3px dashed #000',
        height: "350px",
        width: "500px",
        display: 'flex',
        justifyContent: 'center'
    },
    borderDashHover: {
        border: "3px dashed #aaa",
        height: "350px",
        width: "500px",
        display: 'flex',
        justifyContent: 'center'
    },
    imageChageInput: {

    },
    buttonWrap: {
        margin: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    uploadWrap: {
        marginTop: "100px",
    },
    imageChangeContent: {
        display: 'block'
    },
    removeImageChange: {
        color: color.white,
        backgroundColor: color.red,
        "&:hover": {
            backgroundColor: color.darkred
        }
    }
}))

export default formStyles;