import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const locationStyles = makeStyles((theme) => ({
    container: {

    },
    coverImg: {
        // height: "50vh",
    },
    imgBg: {
        backgroundImage: `url(https://freenice.net/wp-content/uploads/2021/08/Hinh-anh-thien-nhien-dep.jpg)`,
        height: 700,
        display: "flex",
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        width: "100%",
        justifyContent: "space-between",
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