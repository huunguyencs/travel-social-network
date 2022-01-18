import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";


const tourdetailStyles = makeStyles((theme) => ({
    coverTitle: {
        marginTop: 60,
        textAlign: "center",
        paddingTop: 30,
    },
    seeDetail: {
        marginBottom: 20,
        marginInline: 30,
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        paddingInline: 20,
    },
    container: {
        maxWidth: "90%",
        marginInline: 80,
        marginTop: 20,
        marginBottom: 0,
        [theme.breakpoints.down("md")]: {
            marginInline: 20
        }
    },
    timeline: {
        paddingTop: 80,
        marginTop: 80,
        position: "sticky",
        top: 0,
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        }
    },
    smallTimeline: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,

        }
    },
    timelineWrap: {
        display: 'flex',
        overflow: 'auto',
    },
    cardContainer: {
        margin: 30,
        borderRadius: attr.borderRadius.sm,
        [theme.breakpoints.down("md")]: {
            marginInline: 10,

        }
    },
    imgContainer: {
        padding: 20,
        justifyContent: "center",
        display: "flex",
    },
    img: {
        height: "150px",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            height: "100px",
        }
    },
    contentContainer: {
        marginTop: 10,
    },
    reviewBtn: {
        backgroundColor: "#ECCC68",
        borderRadius: attr.borderRadius.md,
        padding: 8,
        paddingInline: 15,
        marginTop: 15,
        marginBottom: 5,
    },
    locationName: {
        marginTop: 40,
    },
    activeTimeline: {
        backgroundColor: "#52BEDB",
        color: "black",
        [theme.breakpoints.down("sm")]: {
            marginInline: 20,
            paddingInline: 10
        }
    },
    unactiveTimeline: {
        color: "black",
        [theme.breakpoints.down("sm")]: {
            marginInline: 20
        }
    },
    activeDot: {
        backgroundColor: "#52BEDB !important",
    },
    unactiveDot: {
        color: "gray"
    },
    addContainerSmall: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
            margin: 20,
        }
    },
    addContainerLarge: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    tourHeader: {
        display: "flex",
        justifyContent: "right",
    },
    addTour: {
        fontSize: 16,
        textTransform: 'none',
        padding: 5,
        paddingInline: 10,
        backgroundColor: color.turquoise,
        margin: 10,
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
        marginTop: 20,
        backgroundColor: color.turquoise,
        marginLeft: 20,
        textTransform: 'none',
        [theme.breakpoints.down("md")]: {
            marginLeft: 10,
        }
    },
    itemInfo: {
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
    },
    hashtagWrap: {
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
    },
    hashtag: {
        display: "inline",
        marginRight: 5,
        color: color.brightgreek,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    imageLocation: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    addHeader: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10
    },
    mapRight: {
        height: 500,
        margin: 30,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    delete: {
        backgroundColor: color.red,
        "&:hover": {
            backgroundColor: color.darkred,
        }
    },
    paperAddService: {
        padding: 5
    },
    headerService: {
        display: 'flex',
        justifyContent: 'right'
    },
    addServiceContent: {
        padding: 20,
    },
    addDayWrap: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: 'center'
        }
    },
    editButton: {
        textTransform: 'none',
        backgroundColor: color.turquoise,
        marginInline: 20
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    feedTour: {
        [theme.breakpoints.down("sm")]: {
            marginTop: 30
        }
    },
    cost: {
        cursor: "pointer"
    },
    servicePaper: {
        padding: 10,
        height: 500,
        overflow: "hidden",
        overflowY: "scroll",
    },
    line: {
        width: "80%"
    }
}))

export default tourdetailStyles;