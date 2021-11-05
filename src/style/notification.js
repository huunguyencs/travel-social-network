import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const notificationStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    fixWidth: {
        maxWidth: "60%",
        backgroundColor: color.white,
    },
    list: {
        margin: 50,
    },
    itemContainer: {
        marginTop: 30,
        paddingTop: 20,
        paddingBottom: 20,
        paddingInline: 70,
        backgroundColor: color.lightgray,
        height: 100,
        borderRadius: attr.borderRadius.md,
    },
    unSeen: {
        backgroundColor: color.gray,
    }

}))

export default notificationStyles;