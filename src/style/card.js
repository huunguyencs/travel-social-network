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
        paddingInline: 10,
    },
    weatherCardContainer: {
        marginRight: 40,
        marginTop: theme.spacing(6),
        top: 0,
        borderRadius: attr.borderRadius.md,
    },
    content: {
        padding: 20,
    },
    icon: {
        width: 100,
        marginTop: 30,
        marginBottom: 30,
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
        marginRight: 40,
        marginLeft: 30,
    },
    value: {
        fontSize: 18,
    }
}))

export default cardStyles;