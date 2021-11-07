import { makeStyles } from "@material-ui/core";

const profileStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "90vh",
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
    position: "relative"
  },
  change_background_upload: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
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
    maxWidth: "70%",
    height: "65vh",
    display: "flex",
    marginTop: "10vh",
    flexDirection: "column",
  },
  profile_overImage: {
    borderRadius: "30px",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    height: "90%",
  },
  profile_avatar__img: {
    height: "200px",
    width: "200px",
    border: "5px solid white",
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
  paper: {
    width: "600px",
    height: "650px",
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(2, 4, 3),
    border: '0.5px solid #000',
    borderRadius: "15px",
    overflow: "hidden",
    padding: "2px",
    // boxShadow: theme.shadows[5]
  },
  modal_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    borderBottom: "1px solid #f1f1f1"
  },
  modal_header_left: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f1419",
  },
  modal_header_closeIcon: {
    width: "40px",
    height: "40px",
    color: "rgb(165, 222, 200)",
    fontSize: "12px",
    cursor: "pointer"
  },
  modal_body: {
    maxHeight: "590px",
    height: "590px",
    overflowY: "auto"
  },
  modal_body_user: {
    minHeight: "90px",
    borderBottom: "1px solid #f1f1f1",
    position: "relative",
    zIndex: 8,
    transition: "all .15s linear"
  },
  modal_body_user_button: {
    color: "rgb(165, 222, 200)",
    width: "120px",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "rgb(165, 222, 200)",
      color: "white"
    }

  }
}));

export default profileStyles;