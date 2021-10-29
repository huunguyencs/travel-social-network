import { makeStyles } from "@material-ui/core";

import color from "./color";

const rightbarStyles = makeStyles((theme) => ({
    container: {
        color: 'white',
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
        alignItems: 'center'
    },

    friend: {
        borderRadius: 20,
        color: color.text,
        padding: 20,
        backgroundColor: color.white,
    },
    text: {
        fontSize: "1.15em",
        fontWeight: 500,
    },
    item: {
        borderRadius: 20,
        paddingInline: theme.spacing(5),
    },
}));

export default rightbarStyles;