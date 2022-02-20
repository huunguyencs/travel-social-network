import { makeStyles } from "@material-ui/core";


const volunteerDetailStyles = makeStyles((theme) => ({
    volunteerDetailTitle:{
        color: "#999",
        fontWeight: 300,
        fontSize: "30px"
    },
    volunteerInfo:{
        marginTop: "20px",
        maxWidth: "80%",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
        }
    },
    scheduleItem:{
        maxWidth: "75%",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
        }
    },
    timeline: {
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
    volunteerRegister:{
        marginTop: 20,
        marginBottom: 30
    },
    registerAll:{
        marginTop: 10,
        marginBottom: 20
    },
    registerTable:{
        width: "80%",
        border: "1px solid #bcbcbc",
        [theme.breakpoints.down("sm")]: {
            width: "100%",  
        }
    },
    registerTableTitle:{
        padding: "10px 15px",
        borderRight: "1px solid #bcbcbc",
        borderBottom: "1px solid #bcbcbc"
    },
    registerTableData:{
        padding: "10px 15px",
        borderRight: "1px solid #bcbcbc",
    },
    registerTableBooking:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    registerTableBookingButton:{
        height: 50,
        marginTop: 10,
        backgroundColor: '#a5dec8',
        [theme.breakpoints.down("sm")]: {
            height: 35,
            fontSize: 11    
        }
    },
    registerItemBooking:{
        display: 'flex',
        backgroundColor: 'white',
        width: "400px",
        padding: "10px 15px",
        justifyContent: 'space-around'
    },
    registerItemBookingButton: {
        height: 50,
        marginTop: 10,
        backgroundColor: '#a5dec8'
    },
    volunteerOther:{
        maxWidth: "80%"
    }
}))

export default volunteerDetailStyles;