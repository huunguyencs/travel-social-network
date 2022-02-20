import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const profileStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // display: "flex",
    // height: "100vh",
    paddingTop: "75px",
    marginBottom: 20
  },
  tabsWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // width: "30%",
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
      borderRight: 'none',
      marginBottom: 20
    }
  },
  tab: {
    textAlign: "center",
    textTransform: "none",
    fontSize: 16,
    marginRight: 30
  },
  tabPanel: {
    flex: 1
  },
  change_background: {
    marginLeft: 10,
    width: "100%",
    height: "180px",
    position: "relative",
  },
  change_background_upload: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    cursor: "pointer",
  },
  change_bg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  change_wrapper: {
    padding: "0 10px",
    position: "relative"
  },
  change_avatar: {
    width: "140px",
    height: "140px",
    marginTop: "-80px",
    // overflow: "hidden",
    position: "relative",
    marginLeft: 30
  },
  change_avatar_upload: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // transform: "translate(-50%,-50%)"
  },
  change_avatar_img: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #fff",
    backgroundColor: color.white,
  },
  change_form: {
    width: "100%",
    marginTop: 20,
    marginLeft: 20,
  }
  ,
  container: {
    position: "relative",
    maxWidth: "80%",
    height: "65vh",
    display: "flex",
    marginTop: 70,
    flexDirection: "column",
  },
  profile_overImage: {
    backgroundColor: color.white,
    borderRadius: "10px",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    height: "80%",
    cursor: "pointer",
    transition: "0.8s",
    "&:hover": {
      filter: "brightness(90%)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "65%"
    },
  },
  profile_avatar__img: {
    backgroundColor: color.white,
    height: "200px",
    width: "200px",
    border: "5px solid white",
    cursor: "pointer",
    transition: "0.8s",
    "&:hover": {
      filter: "brightness(90%)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "170px",
      width: "170px",
    },
  },
  profile_avatar: {
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      justifyContent: 'center'
    },
  },
  profile_info: {
    position: "absolute",
    display: "flex",
    marginTop: "42vh",
    marginLeft: "7vw",
    [theme.breakpoints.down("sm")]: {
      display: 'block',
      marginTop: '30vh'
      // position: 'relative'
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_button: {
    marginTop: "120px",
    marginLeft: "8vw",
    [theme.breakpoints.down("md")]: {
      marginLeft: '4vw',
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      marginLeft: 10
    },
  },
  button: {
    backgroundColor: color.turquoise,
    marginRight: "20px",
    padding: "8px",
    paddingInline: "16px",
    borderRadius: attr.borderRadius.md,
    textTransform: 'none',
    [theme.breakpoints.down("md")]: {
      marginBottom: 5
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 10,
      paddingInline: 10,
      fontSize: 12,
    },
  },
  infoUser: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "90px",
    marginLeft: "2vw",
    [theme.breakpoints.down("sm")]: {
      marginTop: 5
    },
  },
  fullname: {
    fontSize: "30px",
    color: 'inherit',
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      alignSelf: 'center',
      fontSize: "22px"
    },
  },
  follow: {
    display: "flex",
    fontSize: "20px",
    color: "inherit"
  },
  followInfo: {
    marginRight: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14
    },
  },
  change_password: {
    marginTop: 50
  },
  inputfield: {
    marginTop: 20,
    marginLeft: 20
  },
  change_password_form: {
    margin: 30
  },
  cmnd_front:{
    width: "200px",
    height: "140px",
    // overflow: "hidden",
    position: "relative",
    marginBottom: 10
  },
  cmnd_front_upload:{
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cmnd_front_image:{
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  cmnd_textStrong:{
    fontWeight: "bold"
  },
  input_cmnd_number:{
    width: 550,
    marginBottom: 10
  },
  cmnd_icon_upload:{
    border: "2px solid white",
    color: "white",
  },
  confirmAccount:{
    marginTop: 20
  },
  state0:{
    color: "#ff7200",
    fontSize: 17
  },
  state1:{
    color: "#61c38e",
    fontSize: 17
  },
  state2:{
    color: "#ff0000",
    fontSize: 17
  }
}));

export default profileStyles;