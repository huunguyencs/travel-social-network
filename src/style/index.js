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


const useStyles = makeStyles((theme) => ({
    ...shareStyles,
    rightbar: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        }
    },

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
    feedStyles
};