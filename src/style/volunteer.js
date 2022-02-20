import { makeStyles } from "@material-ui/core";


const volunteerStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: 30,
    // [theme.breakpoints.down('md')]: {
    //   margin: 20
    // },
    // [theme.breakpoints.down('sm')]: {
    //   margin: 10
    // }
  },
  media: {
    height: 200,
  },
  name: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 15,
    '&:hover': {
      textDecorationLine: 'underline',
    }
  },
  username: {
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      textDecorationLine: 'underline',
    }
  },
  subheader: {
    fontSize: '13px',
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    }
  },
}))

export default volunteerStyles;