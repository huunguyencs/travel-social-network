import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";


const tourdetailStyles = makeStyles((theme) => ({
    coverTitle: {
        marginTop: 60,
        textAlign: "center",
        paddingTop: 30,
    },
    title: {

    },
    container: {
        maxWidth: "90%",
        margin: 80,
        marginBottom: 0,
    },
    timeline: {
        paddingTop: 80,
        marginTop: 80,
        position: "sticky",
        top: 0,
        paddingBottom: 300,
    },
    cardContainer: {
        margin: 30,
        borderRadius: attr.borderRadius.sm,
    },
    imgContainer: {
        padding: 30,
        justifyContent: "center",
        display: "flex",
    },
    img: {
        height: "250px",
        width: "250px",
    },
    contentContainer: {
        marginTop: 10,
    },
    costContainer: {
        textAlign: "right",
        marginRight: 30,
        backgroundColor: "#52BEDB",
        borderRadius: attr.borderRadius.sm,
        padding: 5,
        paddingInline: 10,
    },
    reviewBtn: {
        backgroundColor: "#ECCC68",
        borderRadius: attr.borderRadius.md,
        padding: 8,
        paddingInline: 15,
        marginTop: 35,
        marginBottom: 15,
    },
    locationName: {
        marginTop: 20,
    },
    activeTimeline: {
        backgroundColor: "#52BEDB",
        color: "black",
    },
    unactiveTimeline: {
        color: "black",
    },
    activeDot: {
        backgroundColor: "#52BEDB !important",
    },
    unactiveDot: {
        color: "gray"
    },
    addContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    },
    tourHeader: {
        display: "flex",
        justifyContent: "space-between",
    },
    addTour: {
        padding: 10,
        paddingInline: 50,
        backgroundColor: color.turquoise,
        marginBottom: 50,
    },
    likeIcon: {
        color: color.like,
    },
    marginIcon: {
        marginLeft: 20,
    },
    numLike: {
        marginRight: 30,
    },
    review: {
        marginInline: 30,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addDay: {
        marginTop: 40,
        backgroundColor: color.turquoise,
        marginLeft: 20,
    }
}))

export default tourdetailStyles;