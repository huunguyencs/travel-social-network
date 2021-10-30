import React from "react";
import { Home, WhatsApp, } from "@material-ui/icons";
import { Avatar, Button, Container, Typography } from "@material-ui/core";

import profileStyles from '../../style';
import { Link } from "react-router-dom";




export default function Profile_Avatar(props) {
  const classes = profileStyles();
  return (
    <Container className={classes.container}>
      <div>
        <img className={classes.profile_overImage} src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="cover" />
      </div>
      <div className={classes.profile_info}>
        <div className={classes.profile_avatar}>
          <Avatar className={classes.profile_avatar__img} src="https://img.thuthuatphanmem.vn/uploads/2018/10/26/anh-dep-cau-rong-da-nang-viet-nam_055418962.jpg" alt="avatar" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "100px", marginLeft: "5vw", }}>
          <Typography variant="body1" color="black" component="p" style={{ fontSize: "35px", }}>
            Tran Van A
          </Typography>
          <div >
            <Typography variant="body1" color="#9b9696" component="p" style={{ fontSize: "20px", }}>
              <Link style={{ marginRight: "20px", }}>30 Following</Link>
              <Link >30 Followed</Link>
            </Typography>
          </div>
        </div>
        <div className={classes.profile_button} style={{ marginTop: "120px", marginLeft: "10vw", }}>
          <Button variant="outlined" startIcon={< Home />} style={{ backgroundColor: "#A5DEC8", marginRight: "20px", }}>
            Follow
          </Button>
          <Button style={{ backgroundColor: "#A5DEC8" }} variant="outlined" startIcon={<WhatsApp />}>
            Chat
          </Button>
        </div>
      </div>
    </Container>
  )
}