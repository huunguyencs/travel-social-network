import { makeStyles } from "@material-ui/core";

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
        color: "#2F3542",
        padding: 20,
        backgroundColor: "#EEF6F3",
    },
    text: {
        fontSize: "1.15em",
        fontWeight: 500,
    },
    item: {
        borderRadius: 20,
        paddingInline: theme.spacing(5),
    },
    list: {

    }
}));

export default rightbarStyles;