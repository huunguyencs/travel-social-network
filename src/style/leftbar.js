import { makeStyles } from "@material-ui/core";

const leftbarStyles = makeStyles((theme) => ({

    container: {
        color: '#2F3542',
        paddingTop: theme.spacing(10),
        position: "sticky",
        marginTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        top: 0,
    },
    panel: {
        backgroundColor: "#EEF6F3",
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
            backgroundColor: "#A5DEC8",
        },
    },
    itemActive: {
        backgroundColor: "#A5DEC8",

    },
    icon: {
        color: "#2F3542",
        marginInline: theme.spacing(3),
    },
    text: {
        fontSize: '1.2em',
        fontWeight: 500,
        color: "#2F3542",
    },
}));

export default leftbarStyles;