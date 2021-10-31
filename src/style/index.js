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

const useStyles = makeStyles((theme) => ({
    ...shareStyles,
    rightbar: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        }
    },
    notFoundContainer: {
        height: "100vh",
        // display: "flex",
        // justifyContent: "center",
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
};