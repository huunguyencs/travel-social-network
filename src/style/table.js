import { makeStyles } from "@material-ui/core";

const tableStyles = makeStyles((theme) => ({
    container: {
        marginTop: 120,
        marginBottom: 30
    },
    paper: {
        display: 'flex',
        justifyContent: 'center'
    },
    admin_location_header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: 20
    },
    addBtn: {
        backgroundColor: "#179250",
        borderRadius: "10px",
        textTransform: 'none'
    }
}))

export default tableStyles;