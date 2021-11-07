import React from "react";
import { WhatsApp, Cancel, RssFeed } from "@material-ui/icons";
import { Avatar, Button, Container, Typography, Modal, Backdrop, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from "@material-ui/core";

import { profileStyles } from "../../style";





export default function Profile_Avatar(props) {
  const classes = profileStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className={classes.paper}>
      <div className={classes.modal_header}>
        <h2 className={classes.modal_header_left}>Following</h2>
        <div className={classes.modal_header_right}>
          <Cancel className={classes.modal_header_closeIcon} />
        </div>
      </div>
      <List className={classes.modal_body}>
        <ListItem button className={classes.modal_body_user}>
          <ListItemAvatar>
            <Avatar alt="avatar" src="">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Tran Van An" />
          <ListItemSecondaryAction>
            <Button variant="outlined" className={classes.modal_body_user_button}  >
              Follow
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button className={classes.modal_body_user}>
          <ListItemAvatar>
            <Avatar alt="avatar" src="">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Tran Van Be" />
          <ListItemSecondaryAction>
            <Button variant="outlined" className={classes.modal_body_user_button}  >
              Follow
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button className={classes.modal_body_user}>
          <ListItemAvatar>
            <Avatar alt="avatar" src="">
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Tran Van Be" />
          <ListItemSecondaryAction>
            <Button variant="outlined" className={classes.modal_body_user_button}  >
              Follow
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
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
              <Typography style={{ marginRight: "20px", cursor: "pointer", }} onClick={handleOpen} >30 Following</Typography>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                {body}
              </Modal>
              <Typography style={{ cursor: "pointer", }} onClick={handleOpen} >30 Followed</Typography>
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