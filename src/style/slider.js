import { makeStyles } from "@material-ui/core"

const sliderStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "100%",
        width: "100%",
        flexGrow: 1,
    },
    img: {
        height: 800,
        display: "flex",
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
        justifyContent: "space-between",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down("md")]: {
            height: 600,
        },
        [theme.breakpoints.down("sm")]: {
            height: 300,
        },
    },
    textCover: {
        paddingTop: 250,
        [theme.breakpoints.down("md")]: {
            paddingTop: 200,
        },
        [theme.breakpoints.down("sm")]: {
            paddingTop: 100,
        },
    },
    button: {
        marginTop: 300,
        height: 50,
        width: 50,
        [theme.breakpoints.down("md")]: {
            marginTop: 200,
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: 100,
        },
    },
    icon: {
        fontSize: 40,
    },
    description: {
        fontSize: 16,
        fontStyle: "italic",
    },
    title: {
        [theme.breakpoints.down("md")]: {
            fontSize: 42,
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: 32,
        },
    },
    subtitle: {
        [theme.breakpoints.down("md")]: {
            fontSize: 36,
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: 24,
        },
    }
}));

export default sliderStyles;