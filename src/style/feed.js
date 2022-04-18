import { makeStyles, alpha } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const feedStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 60,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    },
    create: {
        marginTop: 20,
        marginBottom: 20,
        border: "1px solid #e8e8e8",
        background: "#fff",
        borderRadius: attr.borderRadius.md,
        boxShadow: "none"
    },
    createWrapper:{
        borderRadius: attr.borderRadius.md,
    },
    compose:{
        padding: 16,
        borderBottom: "1px solid #e8e8e8",
        height: 60
    },
    composeForm:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    composeFormImage:{
        height: 42,
        width: 42,
        borderRadius: "50%"
    },
    composeOptions:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 8,
        borderRadius: `0 0 ${attr.borderRadius.md}px ${attr.borderRadius.md}px`,
        background: color.white,
        cursor: "pointer"
    },
    composeOption:{
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "6px 16px",
        marginRight: 10,
        background: "#f7f7f7",
        borderRadius: 500,
        fontSize: 15,
        color: "#888da8",
        transition: "all 0.3s"
    },
    composeIcon:{
        height: 20,
        width: 20,
        transition: "all 0.3s",
        marginRight: 5
    },
    createTourContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 20,
        marginBottom: 30,
    },
    createTour: {
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        padding: 10,
        display: 'flex',
        justifyContent: 'center'
        // paddingInline: 30,
    },
    containerText: {
        // width: "90%",
        // width: "100%",
        marginInline: 20,
        display: 'flex',
        alignSelf: 'center',
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
        marginLeft: 20,
        width: "100%",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    event: {
        // paddingTop: 50,
    },
    hot: {
        paddingTop: 50,
    },
    centerMarginTop: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    }
}));

export default feedStyles;