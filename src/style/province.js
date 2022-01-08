import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const provinceStyles = makeStyles((theme) => ({
    img: {
        position: "relative",
        textAlign: "center",
        color: "white",
    },
    image: {
        width: "100%",
        height: 700,
        // [theme.breakpoints.down("md")]: {
        //     width: "100%",
        //     height: 600,
        // },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: 300,
        },
    },
    provinceName: {
        position: 'absolute',
        color: color.white,
        fontWeight: 400,
        fontSize: 100,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: color.black,
        [theme.breakpoints.down("md")]: {
            fontSize: 64
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 48
        },
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
        height: 600
    },
    patination: {
        display: "flex",
        justifyContent: "center",
        marginTop: 10
    },
    subtitleDes: {
        marginLeft: 10
    },
    ul: {
        marginLeft: 10,
        listStyleType: 'disc'
    },
    subsubtitleDes: {
        marginLeft: 30
    },
    source: {
        display: 'flex',
        justifyContent: "right",
        marginRight: 30,
        marginBottom: 30
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 150
    }
}))

export default provinceStyles;