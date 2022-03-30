
import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const formStyles = makeStyles((theme) => ({
    addLocationContainer: {
        // borderRadius: attr.borderRadius.md,
        // padding: 20,
        // margin: 20,
        width: '100%',
    },
    paperContainer: {
        padding: 20,
        margin: 20,
        width: 500,
        borderRadius: attr.borderRadius.md,
        [theme.breakpoints.down("sm")]: {
            padding: 10,
            width: 400
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
        paddingInline: 20,
        marginBlock: 15,
        borderRadius: attr.borderRadius.md,
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
        width: "100%",
        // [theme.breakpoints.down("sm")]: {
        //     width: "300px"
        // }
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
        padding: 20
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
        display: 'flex',
        justifyContent: 'center',
        // marginInline: 50,
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
        marginTop: 20,
        marginInline: 20
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
        transition: "0.5s",
        "&:hover": {
            filter: "brightness(80%)",
        },
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
        position: 'relative'
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
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
    },
    borderDashHover: {
        border: "3px dashed #aaa",
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
    },
    imageChageInput: {

    },
    buttonWrap: {
        margin: 20,
        display: 'flex',
        justifyContent: 'right'
    },
    uploadWrap: {
        // alignContent: 'center'
        margin: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
    },
    description: {
        margin: 10
    },
    serviceCard: {
        marginBlock: 20,
        paddingBlock: 10,
        paddingInline: 20,
        marginInline: 30,
        width: 370,
        [theme.breakpoints.down("md")]: {
            marginInline: 0,
            width: 300
        }
    },
    imageService: {
        width: 100,
        height: 100,
    },
    serviceInfo: {
        marginLeft: 15,
        width: "100%"
    },
    changeContainer: {
        position: 'relative'
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    sizeImageAvatar: {
        width: '300px',
        height: '300px'
    },
    sizeImageBg: {
        width: '500px',
        height: '250px'
    }
}))

export default formStyles;