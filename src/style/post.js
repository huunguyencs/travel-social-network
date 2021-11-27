import { makeStyles } from "@material-ui/core";

import color from "./color";
import attr from "./attr";

const postStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 10,
        borderRadius: attr.borderRadius.md,
        backgroundColor: color.white,
    },
    likeIcon: {
        color: color.like,
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
    }
}))

export default postStyles;