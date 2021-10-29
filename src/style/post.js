import { makeStyles } from "@material-ui/core";

import color from "./color";

const postStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: color.white,
    },
    likeIcon: {
        color: color.like,
    },
    imageList: {
        margin: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    imageItem: {
        cursor: "pointer"
    },
    numLike: {
        marginRight: 15,
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
    }
}))

export default postStyles;