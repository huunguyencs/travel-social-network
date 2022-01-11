import { makeStyles } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const cardStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 20,
        borderRadius: attr.borderRadius.md,
        [theme.breakpoints.down("sm")]: {
            margin: 0,
        },
    },
    image: {
        height: 180,
    },
    locationName: {
        marginInline: 20,
        cursor: 'pointer',
        "&:hover": {
            textDecorationLine: 'underline',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 30,
        },
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
        borderRadius: attr.borderRadius.md,
    },
    covidCardContainer: {
        marginTop: 40,
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
        [theme.breakpoints.down("md")]: {
            marginLeft: 10,
            marginRight: 10,
        },
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.down("xs")]: {
            marginLeft: 20,
            marginRight: 30,
        },
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
        [theme.breakpoints.down("md")]: {
            margin: 0,
        },
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
        [theme.breakpoints.down("md")]: {
            fontSize: 36,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 30,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 24,
        },
    },
    starContent: {
        marginInline: 30,
    },
    starContainer: {
        borderRadius: attr.borderRadius.md,
    },
    center: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("md")]: {
            fontSize: 16,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 8,
        },
    },
    textStar: {
        [theme.breakpoints.down("md")]: {
            fontSize: 36,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 30,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 24,
        },
    },
    rateLabel: {
        marginRight: 10
    },
    // center: {
    //     display: "flex",
    //     justifyContent: "center"
    // },
    button: {
        paddingInline: 20,
        backgroundColor: color.turquoise,
        marginTop: 20
    },
    locationPopper: {
        width: 300,
        // height: 280,
    },
    positionContainer: {
        display: "flex",
        width: 300
    },
    locationIcon: {
        fontSize: 24,
        color: 'red'
    },
    weatherFocastCard: {
        width: 500,
        margin: 10,
        borderRadius: 5
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        margin: 50
    },
    buttonWrap: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 10
    },
    fullnameWrap: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 10
    },
    addButton: {
        backgroundColor: color.turquoise
    }
}))

export default cardStyles;