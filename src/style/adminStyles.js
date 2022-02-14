import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const adminStyles = makeStyles((theme) => ({
    container: {

    },

    adminLocation_itemInput: {

    },
    adminLocation_body: {

    },
    adminLocation_button: {
        maxWidth: "100%",
        width: "100%",
    },

    coverImg: {
        // height: "50vh",
    },
    imgBg: {
        backgroundImage: `url(https://toquoc.mediacdn.vn/2018/12/25/cau-vang-ba-na-3-15457134861131150541874.jpg)`,
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
    },
    fullField: {
        width: "100%",
        marginBlock: 10
    },
    smHidden: {
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
    }
}))

export default adminStyles;