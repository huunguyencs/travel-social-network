import { makeStyles } from "@material-ui/core";

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
        width: "40px",
        height: "40px",
        color: "rgb(165, 222, 200)",
        fontSize: "12px",
        cursor: "pointer"
    },
    modal_body: {
        maxHeight: "590px",
        height: "590px",
        overflowY: "auto"
    },
    modal_body_user: {
        minHeight: "90px",
        borderBottom: "1px solid #f1f1f1",
        position: "relative",
        zIndex: 8,
        transition: "all .15s linear"
    },
    modal_body_user_button: {
        color: "rgb(165, 222, 200)",
        width: "120px",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "rgb(165, 222, 200)",
            color: "white"
        }

    }
}))

export default modalListStyles;