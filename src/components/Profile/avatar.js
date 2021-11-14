import React, { useState } from "react";
import { WhatsApp, Cancel, RssFeed } from "@material-ui/icons";
import { Avatar, Button, Container, Typography, Modal, Backdrop, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";

import { profileStyles } from "../../style";
import UserList from "../modalList/userList";

const userList = [
  {
    _id: 132123,
    firstName: "An",
    lastName: "Nguyễn",
    avatarImage: "",
  },
  {
    _id: 456,
    firstName: "An",
    lastName: "Nguyễn",
    avatarImage: "",
  },
  {
    _id: 798,
    firstName: "An",
    lastName: "Nguyễn",
    avatarImage: "",
  }
]



export default function Profile_Avatar(props) {
  const classes = profileStyles();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);


  const handleOpenFollowing = () => {
    setOpenFollowing(true);
  };

  const handleCloseFollowing = () => {
    setOpenFollowing(false);
  };

  const handleOpenFollower = () => {
    setOpenFollower(true);
  };

  const handleCloseFollower = () => {
    setOpenFollower(false);
  };

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
            <Typography variant="body1" color="#9b9696" component="p" style={{ display: "flex", fontSize: "20px", }}>
              <Typography style={{ marginRight: "20px", cursor: "pointer", }} onClick={handleOpenFollowing} >30 Following</Typography>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openFollowing}
                onClose={handleCloseFollowing}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <UserList listUser={userList} title={"Following"} handleClose={handleCloseFollowing} />
              </Modal>
              <Typography style={{ cursor: "pointer", }} onClick={handleOpenFollower} >30 Follower</Typography>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openFollower}
                onClose={handleCloseFollower}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <UserList listUser={userList} title={"Follower"} handleClose={handleCloseFollower} />
              </Modal>
            </Typography>
          </div>
        </div>
        <div className={classes.profile_button} style={{ marginTop: "120px", marginLeft: "10vw", }}>
          <Button variant="outlined" startIcon={< RssFeed />} style={{ backgroundColor: "#A5DEC8", marginRight: "20px", }}>
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