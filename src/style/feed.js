import { makeStyles, alpha } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const feedStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    },
    create: {
        display: "flex",
        justifyContent: "center",
        margin: 30,
        marginBottom: 50,
    },
    createTour: {
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        padding: 10,
        // paddingInline: 30,
    },
    containerText: {
        // width: "90%",
        width: "100%",
        backgroundColor: color.white,
        paddingInline: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: attr.borderRadius.md,
        border: "1px solid rgba(47, 53, 66, 0.5)",
        "&:hover": {
            backgroundColor: alpha("#aaa", 0.15),
        },
    },
    createText: {
        width: "100%",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    event: {
        paddingTop: 50,
    },
    hot: {
        paddingTop: 50,
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    feedContent: {
        marginInline: 30
    }
}));

export default feedStyles;