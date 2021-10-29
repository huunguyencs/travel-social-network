import { makeStyles } from "@material-ui/core";

const postStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: "#EEF6F3",
    },
    likeIcon: {
        color: "#ed4956",
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
        color: "#2F3542",
        cursor: "pointer"
    },
    location: {
        padding: 5,
        cursor: "pointer",
        color: "#2F3542",
    }
}))

export default postStyles;