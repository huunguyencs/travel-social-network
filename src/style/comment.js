import { makeStyles } from "@material-ui/core";

import color from "./color";

const commentStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        marginTop: 10,
        marginBottom: 20,
        marginInline: 30,

    },
    avatar: {
        marginRight: 10,
    },
    cmtInfo: {

    },
    content: {
        backgroundColor: color.background,
        padding: 10,
        borderRadius: 10,
    },
    cmtSubinfo: {
        display: "flex",
        marginTop: 5,
    },
    smallText: {
        fontSize: "14px",
    },
    like: {
        marginInline: 10,
        display: "flex",
    },
    time: {
        marginInline: 10,
    },
    likeIcon: {
        fontSize: "15px",
    },
    likeBtn: {
        color: (props) => props.like ? theme.palette.primary.main : "black",
        fontWeight: (props) => props.like ? 600 : 400,
        marginInline: 5,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    userName: {
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    }
}))

export default commentStyles;