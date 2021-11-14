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
        marginBottom: 10,
        color: color.text,
        cursor: "pointer"
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
}))

export default postStyles;