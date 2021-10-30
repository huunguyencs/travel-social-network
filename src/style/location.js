import { makeStyles } from "@material-ui/core";
import color from "./color";

const locationStyles = makeStyles((theme) => ({
    img: {
        height: 600,
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    provinceName: {
        color: color.white,
        paddingTop: 250,
    },
    desContainer: {
        margin: 50,
        backgroundColor: color.white,
        borderRadius: 20,
    },
    title: {
        backgroundColor: color.turquoise,
        display: "flex",
        justifyContent: "center",
        padding: 15,
        borderRadius: 20,
    },
    desContent: {
        padding: 30,
    },
    locationList: {
        margin: 50,
        backgroundColor: color.white,
        borderRadius: 20,
    },
    listContainer: {
        // display: "flex",
        // margin: 20,
    }
}))

export default locationStyles;