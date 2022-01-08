import { makeStyles } from "@material-ui/core";
import attr from "./attr";
import color from "./color";

const profileStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
    paddingTop: "75px"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "30%",
    marginTop: "5%"
  },
  tab: {
    textAlign: "center"
  },
  tabPanel: {
    flex: 1
  },
  change_background: {
    width: "100%",
    height: "180px",
    position: "relative",
    "&:hover": {

    }
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
    position: "relative"
  },
  change_avatar_upload: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  change_avatar_img: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #fff"
  },
  change_form: {
    width: "100%",
    margin: "0 20px"
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
    borderRadius: "10px",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    height: "90%",
    cursor: "pointer",
    transition: "0.8s",
    "&:hover": {
      filter: "brightness(90%)",
    }
  },
  profile_avatar__img: {
    height: "200px",
    width: "200px",
    border: "5px solid white",
    cursor: "pointer",
    transition: "0.8s",
    "&:hover": {
      filter: "brightness(90%)",
    }
  },
  profile_avatar: {

  },
  profile_info: {
    position: "absolute",
    display: "flex",
    marginTop: "45vh",
    marginLeft: "7vw",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_button: {
    marginTop: "140px",
    marginLeft: "15vw",
  },
  button: {
    backgroundColor: color.turquoise,
    marginRight: "20px",
    padding: "8px",
    paddingInline: "16px",
    borderRadius: attr.borderRadius.md,
  },
  infoUser: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "120px",
    marginLeft: "2vw",
  },
  fullname: {
    fontSize: "35px",
    color: 'inherit'
  },
  follow: {
    display: "flex",
    fontSize: "20px",
    color: "inherit"
  },
  followInfo: {
    marginRight: "20px",
    cursor: "pointer"
  }
}));

export default profileStyles;