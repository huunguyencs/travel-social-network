import { makeStyles } from "@material-ui/core"

const sliderStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "100%",
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
    },
    textCover: {
        paddingTop: 250,
    },
    button: {
        marginTop: 300,
        height: 50,
        width: 50,
    },
    icon: {
        fontSize: 40,
    },
    description: {
        fontSize: 16,
        fontStyle: "italic",
    }
}));

export default sliderStyles;