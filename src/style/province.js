import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const provinceStyles = makeStyles((theme) => ({
    img: {
        position: "relative",
        textAlign: "center",
        color: "white",
    },
    provinceName: {
        position: 'absolute',
        color: color.black,
        fontWeight: 500,
        fontSize: 100,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
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
    map: {
        margin: 30,
    },
    patination: {
        display: "flex",
        justifyContent: "center",
        marginTop: 10
    }
}))

export default provinceStyles;