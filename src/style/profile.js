import { makeStyles } from "@material-ui/core";

const profileStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "90vh",
        paddingTop: "75px"
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: "30%",
        marginTop: "5%"
    },
    tab: {
        textAlign: "center"
    },
    tabPanel: {
        flex: 1
    },
    change_background: {
        width: "100%",
        height: "180px",
        position: "relative"
    },
    change_background_upload: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    },
    change_bg: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    change_wrapper: {
        padding: "0 10px",
        position: "relative"
    },
    change_avatar: {
        width: "140px",
        height: "140px",
        marginTop: "-80px",
        // overflow: "hidden",
        position: "relative"
    },
    change_avatar_upload: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    },
    change_avatar_img: {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid #fff"
    },
    change_form: {
        width: "100%",
        margin: "0 20px"
    }


}));

export default profileStyles;