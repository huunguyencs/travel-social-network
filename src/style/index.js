import { makeStyles } from "@material-ui/core";


import commentStyles from "./comment";
import postStyles from './post';
import leftbarStyles from "./leftbar";
import headerStyles from "./header";
import sliderStyles from "./slider";
import rightbarStyles from "./rightbar";
import inputStyles from "./input";
import feedStyles from "./feed";
import locationStyles from "./location";
import cardStyles from "./card";
import messageStyles from "./message";
import profileStyles from "./profile";
import tourdetailStyles from "./tourdetail";
import provinceStyles from "./province";
import friendCardStyles from "./friendRecommend";
import calendarStyles from "./calendar";
import mapCardStyles from "./mapCardStyle";
import notificationStyles from "./notification";
import formStyles from "./form";
import searchStyles from "./search";
import speedDialStyles from "./speeddial";
import eventStyles from "./event";
import locationCardStyles from "./locationCard";
import serviceStyles from "./service";
import modalListStyles from "./modalList";
import emojiPickerStyles from "./emojiPicker";
import modalStyles from "./modal";



const useStyles = makeStyles((theme) => ({
    leftbar: {
        // [theme.breakpoints.down("md")]: {
        //     maxWidth: "40%"
        // },
        // [theme.breakpoints.down("xs")]: {
        //     maxWidth: "100%"
        // }
    },
    content: {
        // [theme.breakpoints.down("md")]: {
        //     maxWidth: "70%"
        // },
        // [theme.breakpoints.down("xs")]: {
        //     maxWidth: "100%"
        // }
    },
    rightbar: {
        [theme.breakpoints.down('md')]: {
            display: "none",
        }
    },
    notFoundContainer: {
        height: "100vh",
        textAlign: "center",
    }

}));

export default useStyles;
export {
    commentStyles,
    postStyles,
    leftbarStyles,
    headerStyles,
    sliderStyles,
    rightbarStyles,
    inputStyles,
    feedStyles,
    locationStyles,
    cardStyles,
    messageStyles,
    profileStyles,
    tourdetailStyles,
    provinceStyles,
    friendCardStyles,
    calendarStyles,
    mapCardStyles,
    notificationStyles,
    formStyles,
    searchStyles,
    speedDialStyles,
    eventStyles,
    locationCardStyles,
    serviceStyles,
    modalListStyles,
    emojiPickerStyles,
    modalStyles,
};