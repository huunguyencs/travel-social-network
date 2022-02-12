import { makeStyles } from "@material-ui/core";
// import attr from "./attr";
// import color from "./color";

const calendarStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    paperModal: {
        width: 500,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 30,
        margin: "auto",
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30
    },
    button: {
        padding: 10,
        paddingInline: 30,
        backgroundColor: '#fff'
    },
    modal: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCard: {
        padding: 5,
        borderRadius: 5
    },
    amlich: {
        borderCollapse: 'collapse',
        fontSize: '16px',
        borderRadius: 5,
        tableLayout: 'fixed',
        backgroundColor: '#fff',
        padding: '5px',
    },
    ngaythang: {
        cursor: 'pointer',
        // borderBottom: 'solid 1px #eee',
        borderRadius: '50%',
        padding: '8px',
        margin: 2,
        '&:hover': {
            backgroundColor: '#eee'
        }
    },
    ngaytuan: {
        textAlign: 'center',
        color: '#330033',
        backgroundColor: '#eee',
        padding: '3px',
        width: '14.286%',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    t2t6: {
        textAlign: 'left',
        color: '#5a5c5b',
        fontWeight: 'bold'
    },
    t7: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'blue',
    },
    cn: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'red',
    },
    am: {
        textAlign: 'right',
        fontSize: '75%',
        color: '#554C00'
    },
    am2: {
        textAlign: 'right',
        fontSize: '75%',
        color: '#337ab7',
        fontWeight: 'bold'
    },
    today: {
        backgroundColor: '#ada372',
        color: '#fff',
        borderRadius: '50%',
        // border: '1px solid #000',
        padding: '8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#beb483',
        }
    },
    leam: {
        backgroundColor: '#d9edf7',
        borderRadius: '50%',
        padding: '8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eafef8',
        }
    },
    leduong: {
        backgroundColor: '#dff0d8',
        borderRadius: '50%',
        padding: '8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eff1e9',
        }
    },
    tet: {
        backgroundColor: '#f2dede',
        borderRadius: '50%',
        padding: '8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f3efef',
        }
    },
    buttonControl: {
        cursor: 'pointer',
        padding: '10px',
        color: '#000',
        '&:hover': {
            color: '#444'
        }
    },
    tenthang: {
        textAlign: 'center',
        padding: '6px',
        // backgroundColor: '#1e8cbe',
        color: '#000',
        fontSize: '120%'
    },
    navi: {
        textAlign: 'center',
        padding: '5px',
        // backgroundColor: '#1e8cbe',
        color: '#fff',
        fontWeight: 'bold'
    }
}))

export default calendarStyles;