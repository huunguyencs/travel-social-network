import { makeStyles } from "@material-ui/core";

import color from "./color";

const leftbarStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
    },
    panel: {
        backgroundColor: color.white,
        borderRadius: 20,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingInline: theme.spacing(1.5),

    },
    item: {
        paddingInline: theme.spacing(4),
        borderRadius: 20,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        "&:hover": {
            backgroundColor: color.turquoise,
        },
    },
    itemActive: {
        backgroundColor: color.turquoise,

    },
    icon: {
        color: color.text,
        marginInline: theme.spacing(3),
    },
    text: {
        fontSize: '1.2em',
        fontWeight: 500,
        color: color.text,
    },
}));

export default leftbarStyles;