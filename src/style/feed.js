import { makeStyles, alpha } from "@material-ui/core";

const feedStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
        alignContent: "center",
    },
    create: {
        margin: 30,
        marginBottom: 50,
    },
    containerText: {
        backgroundColor: "#EEF6F3",
        paddingInline: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: 20,
        border: "1px solid rgba(47, 53, 66, 0.5)",
        "&:hover": {
            backgroundColor: alpha("#aaa", 0.15),
        },
        height: (props) => props.show ? "5em" : "2em",
    },
    createText: {
        width: "100%",

    },
    menuCreate: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 5,
        marginInline: 20,
    },
    addImageButton: {
        borderRadius: 20,
        padding: 10,
        paddingInline: 30,
        backgroundColor: "#A4B0BE",
    },
    postButton: {
        borderRadius: 20,
        padding: 10,
        paddingInline: 30,
        backgroundColor: "#2ED573",
    },
}));

export default feedStyles;