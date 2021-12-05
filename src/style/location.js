import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const locationStyles = makeStyles((theme) => ({
    img: {
        position: "relative",
        textAlign: "center",
        color: "white",
    },
    coverText: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    name: {
        fontSize: 120,
        fontWeight: 400,
        color: color.black
    },
    provinceName: {
        fontWeight: 400,
    },
    iconProvince: {
        fontSize: "60px",
        marginRight: "10px",
        color: "black"
    },
    infoPanel: {
        marginInline: 20,
        marginTop: 50,
        backgroundColor: color.white,
        borderRadius: attr.borderRadius.md,
    },
    infoHeader: {
        backgroundColor: color.turquoise,
        display: "flex",
        justifyContent: "center",
        padding: 15,
        borderRadius: attr.borderRadius.md,
    },
    infoContent: {
        padding: 30,
    }
}))

export default locationStyles;