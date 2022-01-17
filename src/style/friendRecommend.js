import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";


const friendCardStyles = makeStyles((theme) => ({
    friend: {
        marginTop: 30,
        borderRadius: attr.borderRadius.md,
        color: color.text,
        padding: 20,
        backgroundColor: color.white,
    },
    text: {
        fontSize: "1.15em",
        // fontWeight: 500,
    },
    item: {
        borderRadius: attr.borderRadius.md,
        paddingInline: theme.spacing(4),
    },
}))

export default friendCardStyles;