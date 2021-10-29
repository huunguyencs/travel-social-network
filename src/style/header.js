import { makeStyles, alpha } from "@material-ui/core";


const headerStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#57606F",
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha("#000", 0.15),
        "&:hover": {
            backgroundColor: alpha("#000", 0.25)
        },
        borderRadius: 15,
        width: "40%",
        padding: 3,
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width: "70%",
            marginLeft: 10,
        }
    },
    searchIcon: {
        marginLeft: 10,
    },
    input: {
        width: "100%",
        color: "white",
        marginLeft: theme.spacing(1),
    },
    icons: {
        alignItems: "center",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "none" : "flex"),
        }
    },
    badge: {
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    user: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(5),
    },
    userName: {
        fontSize: 18,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    searchButton: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "none" : "flex"),
            color: "white",
        }
    },
    cancel: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "flex" : "none"),
        }
    },
}));

export default headerStyles;