import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const cardStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 20,
        borderRadius: attr.borderRadius.md,
    },
    image: {
        height: 180,
    },
    locationName: {
        marginInline: 20,
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        paddingInline: 20,
        marginInline: 20,
        marginBottom: 10,
    },
    star: {
        display: "flex",
    },
    starIcon: {
        marginInline: 5,
        color: color.yellow,
    },
    seeMore: {
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        paddingInline: 20,
    },
    weatherCardContainer: {
        marginRight: 40,
        top: 0,
        marginBottom: 30,
        borderRadius: attr.borderRadius.md,
    },
    content: {
        padding: 10,
    },
    icon: {
        width: 150,
        marginTop: 0,
        marginBottom: 0,
    },
    weatherTitle: {
        textAlign: "center",
    },
    temp: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: 50,
        marginRight: 80,
    },
    detailInfo: {
        marginTop: 30,
        paddingInline: 20,
    },
    itemInfo: {
        display: "flex",
        justifyContent: "space-between",
        marginRight: 30,
        marginLeft: 20,
    },
    value: {
        fontSize: 18,
    },
    title: {
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        display: "flex",
        justifyContent: "center",
        padding: 10,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    chart: {
        margin: 30,
    },
    line: {
        maxWidth: "100%",
        marginRight: 20,
        height: 15,
    },
    iconStar: {
        color: color.yellow,
        fontSize: "50px",
        marginRight: 15,
    },
    starContent: {
        marginInline: 30,
    },
    starContainer: {
        margin: 40,
        marginTop: 50,
        marginLeft: 0,
        borderRadius: attr.borderRadius.md,
    },
    center: {
        display: "flex",
        justifyContent: "center",
    }
}))

export default cardStyles;