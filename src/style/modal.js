import { makeStyles } from "@material-ui/core";

const modalStyles = makeStyles((theme) => ({
    container: {
        height: "80%",
        width: "80%",
        margin: 'auto',
        marginTop: 50,
        padding: 20
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    boxScroll: {
        overflow: "hidden",
        overflowY: "scroll"
    },
    center: {
        display: "flex",
        justifyContent: "center"
    },
    contentCovid: {
        width: "70%",
        margin: "auto",
        marginBottom: 40
    },
    tableContainer: {
        width: "70%",
        margin: "auto",
        marginBottom: 40
    },
    weatherContainer: {
        margin: 30,
        marginTop: 50,
        borderRadius: 10,
        padding: 15
    },
    loginContainer: {
        padding: "30px",
    },
    loginTitle: {
        display: 'flex',
        alignSelf: 'center'
    },
    centerMarginTop: {
        display: "flex",
        justifyContent: "center",
        marginTop: 30
    },
    link: {
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 20
    }
}))

export default modalStyles;