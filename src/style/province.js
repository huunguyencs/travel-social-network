import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const provinceStyles = makeStyles((theme) => ({
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
        borderRadius: attr.borderRadius.md,
    },
    title: {
        backgroundColor: color.turquoise,
        display: "flex",
        justifyContent: "center",
        padding: 15,
        borderRadius: attr.borderRadius.md,
    },
    desContent: {
        padding: 30,
    },
    locationList: {
        margin: 50,
        backgroundColor: color.white,
        borderRadius: attr.borderRadius.md,
        // marginBottom: 20,
        paddingBottom: 20,
    },
    listContainer: {
        height: 700,
    }
}))

export default provinceStyles;