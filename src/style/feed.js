import { makeStyles, alpha } from "@material-ui/core";
import color from "./color";
import attr from "./attr";

const feedStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        color: 'black',
        alignContent: "center",
    },
    create: {
        margin: 30,
        marginBottom: 50,
    },
    containerText: {
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
    }
}));

export default feedStyles;