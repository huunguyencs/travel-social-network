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
        // maxWidth: "90%",
        maxWidth: "100%",
        paddingInline: 80,
        marginTop: 20,
        marginBottom: 0,
        [theme.breakpoints.down("md")]: {
            paddingRight: 0
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
        marginBlock: 15,
        width: '100%',
        borderRadius: attr.borderRadius.sm,
        [theme.breakpoints.down("md")]: {
            marginInline: 3,
        },
        [theme.breakpoints.down("sm")]: {
            marginInline: 40,
        },
        [theme.breakpoints.down("xs")]: {
            marginInline: 10,
        }
    },
    serviceContainer: {
        margin: 30,
        width: 500,
        borderRadius: attr.borderRadius.sm,
        [theme.breakpoints.down("md")]: {
            width: 400
        },
        [theme.breakpoints.down("sm")]: {
            width: 500
        },
        [theme.breakpoints.down("xs")]: {
            width: 400,
        }
    },
    detailInfo: {
        // marginTop: 30
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
    locationContentContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    reviewBtn: {
        // backgroundColor: "#ECCC68",
        // borderRadius: attr.borderRadius.md,
        // padding: 8,
        // paddingInline: 15,
        // marginTop: 15,
        // marginBottom: 5,
    },
    locationName: {
        marginTop: 10,
        cursor: 'pointer'
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
        borderRadius: attr.borderRadius.md
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
        borderRadius: attr.borderRadius.md,
        paddingInline: 10,
        marginLeft: 20,
        textTransform: 'none',
        [theme.breakpoints.down("md")]: {
            marginLeft: 10,
        }
    },
    info: {
        marginInline: 100
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
        [theme.breakpoints.down("xs")]: {
            display: 'none',
        }
    },
    image: {
        cursor: 'pointer'
    },
    tabsMenu: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
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
        marginInline: 20,
        borderRadius: attr.borderRadius.md,
        paddingInline: 10,
    },
    removeButton: {
        textTransform: 'none',
        backgroundColor: color.red,
        marginInline: 20,
        borderRadius: attr.borderRadius.md,
        paddingInline: 10,
        color: color.white,
        '&:hover': {
            color: color.black
        }
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
        width: 400,
    },
    serviceList: {
        maxHeight: 500,
        overflow: "hidden",
        overflowY: "scroll",
    },
    line: {
        width: "80%"
    },
    fullField: {
        width: "100%",
        marginBlock: 10
    },
    btnWrap: {
        display: 'flex',
        justifyContent: 'right'
    },
    descriptionInput: {
        width: "100%",
        marginBlock: 10,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: attr.borderRadius.xs,
    },
    imageDetail: {
        [theme.breakpoints.down(1050)]: {
            display: 'none'
        }
    },
    paperDetail: {
        width: 1000,
        [theme.breakpoints.down(1050)]: {
            width: 600
        },
        [theme.breakpoints.down("xs")]: {
            width: 400
        }
    },
    closeBtn: {
        display: 'flex',
        justifyContent: 'right',
    }
}))

export default tourdetailStyles;