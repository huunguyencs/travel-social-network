
import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const formStyles = makeStyles((theme) => ({
    paperContainer: {
        padding: 20,
        borderRadius: attr.borderRadius.md,
        [theme.breakpoints.down("sm")]: {
            padding: 10
        }
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
        marginBlock: 20,
        [theme.breakpoints.down("sm")]: {
            padding: 5,
            paddingInline: 10,
            marginBlock: 10,
        }
    },
    hashtag: {
        width: "100%",
        marginBottom: 15,
    },
    postContentInput: {
        width: "500px",
        [theme.breakpoints.down("sm")]: {
            width: "300px"
        }
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
        maxWidth: "500px",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "300px"
        }
    },
    imageInput: {
        width: "150px",
        height: "150px",
        margin: "5px",
        position: "relative",
        cursor: "pointer",
        [theme.breakpoints.down("sm")]: {
            width: "100px",
            height: "100px"
        }
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
        margin: 'auto',
        [theme.breakpoints.down("sm")]: {
            height: "200px"
        }
    },
    borderDash: {
        border: '2px dashed #000',
        height: "350px",
        width: "500px",
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            height: "200px",
            width: "300px"
        }
    },
    borderDashHover: {
        border: "3px dashed #aaa",
        height: "350px",
        width: "500px",
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            height: "200px",
            width: "300px"
        }
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