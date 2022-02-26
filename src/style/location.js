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
        [theme.breakpoints.down("sm")]: {
            fontSize: "26px",
        }
    },
    iconProvince: {
        fontSize: 40,
        marginRight: "10px",
        color: "black",
        [theme.breakpoints.down("sm")]: {
            fontSize: "30px",
        }
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
        height: 400,
        marginInline: 10,
        marginTop: 50,
    },
    review: {
        marginTop: 30
    },
    fullname: {
        marginTop: 120,
        display: 'flex',
        justifyContent: 'center'
    },
    provinceWrap: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 150
    },
    image: {
        cursor: "pointer",
        height: "100%",
        transition: "0.5s",
        "&:hover": {
            filter: "brightness(85%)",
        }
    },
    titleFullname: {
        [theme.breakpoints.down("sm")]: {
            fontSize: 40
        }
    }
}))

export default locationStyles;