import { makeStyles } from "@material-ui/core";
import color from "./color";

const modalListStyles = makeStyles((theme) => ({
    paper: {
        width: "600px",
        height: "650px",
        backgroundColor: theme.palette.background.paper,
        // padding: theme.spacing(2, 4, 3),
        // border: '0.5px solid #000',
        borderRadius: "15px",
        overflow: "hidden",
        padding: "2px",
        // boxShadow: theme.shadows[5]
    },
    modal_header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #f1f1f1"
    },
    modal_header_left: {
        fontSize: "22px",
        fontWeight: 800,
        color: "#0f1419",
    },
    modal_header_closeIcon: {
        color: color.gray,
        fontSize: "20px",
        width: "25px",
        height: "25px",
    },
    modal_body: {
        maxHeight: "590px",
        height: "590px",
        overflowY: "auto"
    },
    modal_body_user: {
        cursor: "initial",
        minHeight: "90px",
        display: "flex",
        borderBottom: "1px solid #f1f1f1",
        position: "relative",
        zIndex: 8,
        transition: "all .15s linear"
    },
    modal_body_user_button: {
        color: color.gray,
        marginTop: "27px",
        // width: "30%",
        paddingInline: "20px",
        transition: "0.2s",
        '&:hover': {
            backgroundColor: color.gray,
            color: "white",
            // border: "none",
        }
    },
    avatar: {
        width: "10%",
        marginTop: "25px",
        marginLeft: "25px",
    },
    fullname: {
        marginTop: "30px",
        width: "60%",
        fontSize: "20px",
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    imageList: {
        margin: 20,
        height: "100%",
        [theme.breakpoints.down("md")]: {
            height: 400,
        },
        // [theme.breakpoints.down("sm")]: {
        //     height: 200,
        // },
    },
    imageItem: {
        cursor: "pointer",
        transition: "0.5s",
        "&:hover": {
            filter: "brightness(85%)",
        }
    },
    more: {
        cursor: "pointer",
        transition: "0.5s",
        "&:hover": {
            filter: "brightness(85%)",
        },
        filter: "brightness(90%)",
    },
    textCenter: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
    }
}))

export default modalListStyles;