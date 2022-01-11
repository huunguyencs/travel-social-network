import { makeStyles } from "@material-ui/core";

import color from "./color";
import attr from "./attr";

const postStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 10,
        borderRadius: attr.borderRadius.md,
        backgroundColor: color.white,
    },
    likedIcon: {
        color: color.like,
        cursor: 'pointer',
        margin: 10,
        fontSize: 28,
        transition: "0.5s",
        "&:active": {
            fontSize: 20,
        }
    },
    userName: {
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    numLike: {
        marginRight: 15,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    numCmt: {
        marginRight: 15,
    },

    line: {
        width: "80%",
    },
    listCmt: {
        marginTop: 30,
    },
    title: {
        paddingBottom: 20,
        color: color.text,
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    location: {
        padding: 5,
        cursor: "pointer",
        color: color.text,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hashtagWrap: {
        marginTop: 10,
    },
    hashtag: {
        display: "inline",
        marginRight: 5,
        color: color.brightgreek,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    image: {
        cursor: "pointer",
        transition: "0.8s",
        "&:hover": {
            filter: "brightness(90%)",
        }
    },
    iconButton: {
        cursor: 'pointer',
        fontSize: 28,
        margin: 10,
        transition: "0.5s",
        '&:hover': {
            color: color.darkgray,
        },
        "&:active": {
            fontSize: 20,
        }
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    contentWrap: {
        paddingTop: 100,
        width: "70%",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    subheader: {
        cursor: "pointer",
        fontSize: '13px',
        [theme.breakpoints.down("sm")]: {
            fontSize: "10px",
        }
    },
    delete: {
        backgroundColor: color.red,
        "&:hover": {
            backgroundColor: color.darkred,
        }
    }
}))

export default postStyles;