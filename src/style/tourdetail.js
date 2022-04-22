import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";


const tourdetailStyles = makeStyles((theme) => ({
    coverTitle: {
        textAlign: "center",
        // paddingTop: 30,
    },
    seeDetail: {
        marginBottom: 20,
        marginInline: 30,
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        paddingInline: 20,
    },
    // container: {
    //     // maxWidth: "90%",
    //     maxWidth: "100%",
    //     paddingInline: 80,
    //     marginTop: 20,
    //     marginBottom: 0,
    //     [theme.breakpoints.down("md")]: {
    //         paddingRight: 0
    //     }
    // },
    hiddenSmall: {
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
    },
    cardContainer: {
        marginBlock: 15,
        width: '100%',
        // borderRadius: attr.borderRadius.sm,
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
        marginTop: 10,
        width: "100%",
        borderRadius: attr.borderRadius.sm

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
        height: "100%",
        width: "100%",
        objectFit: "cover"
    },
    contentContainer: {
        marginTop: 10,
    },
    locationContentContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    reviewBtn: {
        marginRight: 5,
        color: "#63b696",
        borderRadius: 5,
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: 500,
        outline: "none",
        border: `1px solid ${color.turquoise}`,
        fontSize: 12,
        position: "relative",
        isolation: "isolate",
        "&::before": {
            content: "''",
            height: "100%",
            width: 0,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#63b696",
            zIndex: -1,
            transition: "width 0.25s ease-in",
            color:color.white
        },
        "&:hover::before": {
            width: "100%"
        },
        "&:hover": {
            color: color.white
        },
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
        textTransform: 'none',
        [theme.breakpoints.down("md")]: {
            marginLeft: 10,
        }
    },
    content: {
        marginLeft: 10,
    },
    info: {
        marginInline: 100
    },
    itemInfo: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center'
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
        objectFit: "cover",
        cursor: 'pointer',
        height: "100%",
        borderRadius: attr.borderRadius.md
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
        marginLeft: 50,
        [theme.breakpoints.down("md")]: {
            marginLeft: 20
        },
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
    },
    timeline: {
        maxHeight: 400,
        overflowY: 'auto',
        marginBlock: 20,
        marginLeft: 50,
        [theme.breakpoints.down("md")]: {
            marginLeft: 20,
        },
        [theme.breakpoints.down("sm")]: {
            display: 'flex',
            marginBottom: 15
        }
    },
    timelineItem: {
        marginBlock: 10,
        [theme.breakpoints.down("sm")]: {
            marginBlock: 0
        }
    },
    paperDetailDate: {
        width: "100%"
    },






    container:{
        margin: 0,
        paddingTop: 64
    },
    tourDetailContainer:{
        maxWidth: 1280,
        flexGrow: 1, 
        padding: 0,
        margin: "0 auto",
    },
    tourInfos:{
        maxWidth: 1280,
        padding: 0,
        flexGrow: 1,
        marginTop: 16,
        marginInline: 16

    },
    tourInfoLeftImage:{
        height: 500,
        width: "100%"
    },
    tourInfoRight:{

    },
    tourRecommend:{
        margin:"0 0 20px 10px",
        height: "100%",
        borderRadius: attr.borderRadius.md,
        boxShadow: "0 2px 8px #00000026",
    },
    tourLeftInfo:{
        marginTop: 10,
        padding: 10,
        borderRadius: attr.borderRadius.md,
        boxShadow: "0 2px 8px #00000026",
        backgroundColor: color.white
    },
    tourName:{
        fontWeight: 500,
        fontSize: 25,
        letterSpacing: 1
    },
    tourTime:{
        height: 100,
        width: "100%",
        borderBottom: "1px solid black"
    },
    tourDates:{
        padding: 0,
        flexGrow: 1,
        marginTop: 10,
        marginInline: 16
    },
    tourDatesRight:{

    },
    map:{
        position: "sticky" ,
        top: 74,
        borderRadius: attr.borderRadius.md,
        boxShadow: "0 2px 8px #00000026",
        margin:"0 0 0 10px",
        overflow:"hidden"
    },
    datesWrapper:{
        borderRadius: attr.borderRadius.md
    }
    


}), {index: 1})

export default tourdetailStyles;