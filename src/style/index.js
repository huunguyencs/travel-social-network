import { makeStyles } from "@material-ui/core";

import shareStyles from "./share";
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



const useStyles = makeStyles((theme) => ({
    ...shareStyles,
    rightbar: {
        [theme.breakpoints.down("md")]: {
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
};