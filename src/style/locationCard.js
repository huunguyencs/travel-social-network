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
        [theme.breakpoints.down("sm")]: {
            margin: 2
        }
    },
    media: {
        height: 500,
        [theme.breakpoints.down("sm")]: {
            height: 300
        }
    },
    content: {
        margin: 10,
        [theme.breakpoints.down("sm")]: {
            margin: 2
        }
    },
    rate: {
        marginTop: 10,
        [theme.breakpoints.down("sm")]: {
            marginTop: 3
        }
    },
    fullname: {
        "&:hover": {
            textDecorationLine: 'underline',
        }
    }
}))

export default locationCardStyles;