import { makeStyles } from '@material-ui/core';

const tableStyles = makeStyles(
  theme => ({
    container: {
      marginTop: 120,
      marginBottom: 30
    },
    paper: {
      display: 'flex',
      justifyContent: 'center'
    },
    admin_location_header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: '20px',
      paddingRight: '20px',
      marginBottom: 20
    },
    addBtn: {
      backgroundColor: '#179250',
      borderRadius: '10px',
      textTransform: 'none'
    },
    appBarSpacer: {
      marginTop: 140
    },
    cardInfo: {
      margin: 20,
      padding: 20,
      borderRadius: 10,
      width: '300px'
    },
    cardValue: {
      marginTop: 10
    },
    cardIcon: {
<<<<<<< HEAD
        fontSize: "37px",
        marginRight: 30,
    },
    containerReport:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardPost:{
        width: "600px",
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#a5dec8"
    },
    cardReport:{
        margin: 20,
        padding: 20,
        borderRadius: 10,
        width: "400px",
        backgroundColor: "#a5dec8"
    },
    textReport:{
        margin: 10,
    },
    btnReport:{
        justifyItems: "center",
        justifyContent: "center",
        display: 'flex',
=======
      fontSize: '37px',
      marginRight: 30
>>>>>>> f6600eb73e1ea629e63e4d3976ab459e802d880c
    }
  }),
  { index: 1 }
);

export default tableStyles;
