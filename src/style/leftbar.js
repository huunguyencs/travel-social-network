import { makeStyles } from "@material-ui/core";

import color from "./color";
import attr from "./attr";

const leftbarStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(10),
        position: "sticky",
        // marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        marginLeft: 15,
        [theme.breakpoints.down("md")]: {
            marginLeft: theme.spacing(0),
        },
        top: 0,
    },
    panel: {
        // marginTop: theme.spacing(10),
        // position: "fixed",
        backgroundColor: color.background,
        borderRadius: attr.borderRadius.md,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingInline: theme.spacing(0),
        marginRight: 10,
        [theme.breakpoints.down("sm")]: {
            marginRight: 1,
        }
    },
    item: {
        paddingInline: theme.spacing(4),
        borderRadius: attr.borderRadius.md,
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: color.lightgray,
        },
        [theme.breakpoints.down("md")]: {
            marginInline: theme.spacing(0),
            paddingInline: theme.spacing(1)
        }
    },
    itemActive: {
        backgroundColor: color.turquoise,
    },
    icon: {
        color: color.text,
        marginInline: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            marginInline: theme.spacing(1),
        },
        [theme.breakpoints.down("sm")]: {
            marginInline: 0,
        }
    },
    text: {
        fontSize: '1.2em',
        fontWeight: 500,
        color: color.text,
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
    },
}));

export default leftbarStyles;