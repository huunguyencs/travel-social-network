import { makeStyles } from "@material-ui/core";
import color from "./color";

const eventStyles = makeStyles((theme) => ({
    eventCardContainer: {
        width: 400,
        margin: 20,
    },
    media: {
        height: 300,
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
        paddingTop: 120,
        color: color.white,
        textAlign: "left",
    },
    content: {
        width: "60%",
    },
    paperContent: {
        margin: 20,
        // paddingTop: 20,
    },
    cardContent: {
        padding: 20,
        marginTop: 50,
        marginInline: 30,
    },
    time: {
        marginTop: 10,
        display: "flex",
        color: "black",
    }
}))


export default eventStyles;