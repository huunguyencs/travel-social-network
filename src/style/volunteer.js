import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';
const volunteerStyles = makeStyles(
  theme => ({
    root: {
      maxWidth: '100%',
      margin: 30
    },
    media: {
      height: 200
    },
    name: {
      fontWeight: 500,
      fontSize: 20,
      marginBottom: 15,
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    username: {
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
  subheader: {
    fontSize: '13px',
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    }
  },
  buttonCreate:{
    marginTop: 85,
    backgroundColor: color.turquoise,
    borderRadius: attr.borderRadius.md,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    width: 350,
    marginLeft: 30
  },
  menuIcon: {
    marginRight: 5
  },
}), {index: 1});

export default volunteerStyles;
