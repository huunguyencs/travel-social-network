import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const locationStyles = makeStyles((theme) => ({
    img: {
        height: 600,
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
        backgroundImage: props => `url(${props.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    coverText: {
        paddingLeft: "300px",
        paddingTop: "200px",
        color: color.white,
        textAlign: "left",
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