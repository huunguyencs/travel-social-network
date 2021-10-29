import React from "react";
import { Home, WhatsApp, } from "@material-ui/icons";
import { Avatar,Button,Container, makeStyles, Typography } from "@material-ui/core";


// const user ={
//     name:"Tran Van A",
//     following: 30,
//     followed: 60,
//     avatar: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392",
//   }
const useStyles = makeStyles((theme) => ({
    container: {
      position:"relative",
      maxWidth: "70%",
      height: "65vh",
      display: "flex",
      marginTop:"10vh",
      flexDirection: "column",
    },
    profile_overImage:{
      borderRadius: "30px",
      position:"absolute", 
      width:"100%",
      top:0,
      left:0,
      height:"90%",
    },
    profile_avatar__img:{
      height: "200px",
      width: "200px",
      border: "5px solid white",
    },
    profile_avatar:{ 
  
    },
    profile_info:{ 
      position: "absolute",
      display:"flex",
      marginTop:"45vh",
      marginLeft:"7vw",
    }
  
  }));
export default function Profile_Avatar(props) {
    const classes = useStyles();
    return(
        <Container className={classes.container}>
          <div>
            <img className={classes.profile_overImage} src= "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"></img>
          </div>
          <div className={classes.profile_info}>
            <div className={classes.profile_avatar}>
              <Avatar className={classes.profile_avatar__img} src= "https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg"></Avatar>
            </div>
            <div style={{display:"flex",flexDirection: "column", justifyContent:"center", marginTop:"100px",marginLeft:"5vw",}}>
              <Typography variant="body1" color="black" component="p" style={{fontSize:"35px",}}>
                      Tran Van A
              </Typography>
              <div >
              <Typography variant="body1" color="#9b9696" component="p" style={{fontSize:"20px",}}>
                      <a href="#" style={{marginRight:"20px",}}>30 Following</a>
                      <a href="#" >30 Followed</a> 
              </Typography>
              </div>
            </div>
            <div className={classes.profile_button} style={{marginTop:"120px", marginLeft:"10vw",}}>
              <Button variant="outlined" startIcon={< Home/>} style={{backgroundColor:"#A5DEC8",marginRight:"20px",}}>
                Follow
              </Button>
              <Button style={{backgroundColor:"#A5DEC8"}} variant="outlined" startIcon={<WhatsApp/>}>
                Chat
              </Button>
            </div>
          </div>
      </Container>
    )
}