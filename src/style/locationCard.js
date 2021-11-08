import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const locationCardStyles = makeStyles((theme) => ({
    locationCardContainer: {
        margin: 20,
        borderRadius: attr.borderRadius.md,
        backgroundColor: color.white,
    },
    seeMoreBtn: {
        paddingInline: 10,
        backgroundColor: color.turquoise,
        margin: 10,

    },
    media: {
        height: 500,
    },
    content: {
        margin: 10,
    }
}))

export default locationCardStyles;