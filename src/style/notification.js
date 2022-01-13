import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const notificationStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    fixWidth: {
        maxWidth: "60%",
        backgroundColor: color.white,
        paddingBottom: "1px"
    },
    list: {
        margin: 50,
    },
    itemContainer: {
        cursor: 'pointer',
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingInline: 70,
        backgroundColor: color.lightgray,
        height: 100,
        borderRadius: attr.borderRadius.md,
        transition: "0.5s",
        "&:hover": {
            backgroundColor: color.silver
        }
    },
    unSeen: {
        cursor: 'pointer',
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingInline: 70,
        height: 100,
        borderRadius: attr.borderRadius.md,
        backgroundColor: color.gray,
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 150
    },
    seeAll: {
        color: color.blue,
        margin: 10,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    avatar: {
        marginRight: theme.spacing(2),
    }

}))

export default notificationStyles;