import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const locationStyles = makeStyles((theme) => ({
    imageList: {
        margin: 30,
        marginTop: 50,
        borderRadius: attr.borderRadius.md,
        height: 400,
        padding: 0

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
        fontSize: "40px",
        marginRight: "10px",
        color: "black"
    },
    infoPanel: {
        marginInline: 20,
        marginTop: 50,
        backgroundColor: color.white,
        borderRadius: attr.borderRadius.md,
        height: 400
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
    },
    map: {
        height: 400
    },
    review: {
        marginTop: 30
    }
}))

export default locationStyles;