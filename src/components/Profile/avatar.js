import React, { useEffect, useState } from "react";
import { WhatsApp, RssFeed } from "@material-ui/icons";
import { Avatar, Button, Container, Typography, Modal, Backdrop } from "@material-ui/core";

import { profileStyles } from "../../style";
import UserList from "../modal/userList";
import ImageModal from "../modal/image";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import customAxios from "../../utils/fetchData";
import { follow, unfollow } from "../../redux/callApi/userCall";



export default function Profile_Avatar(props) {

  const { id } = useParams();
  const history = useHistory();

  const { auth } = useSelector(state => state);

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const classes = profileStyles();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [followed, setFollowed] = useState(false);


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

  const handleOpenAvatar = () => {
    setOpenAvatar(true);
  }

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  }

  const handleOpenCover = () => {
    setOpenCover(true);
  }

  const handleCloseCover = () => {
    setOpenCover(false);
  }

  const handleFollow = () => {
    // console.log(user);
    if (followed) {
      dispatch(unfollow(user, auth.token));
      setFollowed(false);
    }
    else {
      dispatch(follow(user, auth.token));
      setFollowed(true);
    }
  }




  const getUser = async () => {
    try {
      const res = await customAxios(auth.token).get(`/user/${id}`);
      setUser(res.data.user)
    }
    catch (err) {
      console.log("loi");
    }
  }

  useEffect(() => {
    const isFollowed = () => {
      if (auth.user && user) {
        for (const u of auth.user.followings) {
          if (u._id === user._id) {
            return true;
          }
        }
        return false;
      }

    }

    if (auth.token) {
      if (auth.user._id === id) {
        setUser(auth.user);
      }
      else {
        getUser();
      }
      if (isFollowed()) setFollowed(true);
      else setFollowed(false);
    }
  }, [id, setUser, auth, history, getUser, user]);

  return (
    <Container className={classes.container}>
      <div>
        <img className={classes.profile_overImage} src={user?.background} alt="cover" onClick={handleOpenCover} />
        <ImageModal
          open={openCover}
          handleClose={handleCloseCover}
          img={user?.background}
        />
      </div>
      <div className={classes.profile_info}>
        <div className={classes.profile_avatar}>
          <Avatar className={classes.profile_avatar__img} src={user?.avatar} alt="avatar" onClick={handleOpenAvatar} />
          <ImageModal
            open={openAvatar}
            handleClose={handleCloseAvatar}
            img={user?.avatar}
          />
        </div>
        <div className={classes.infoUser}>
          <Typography variant="body1" color="black" component="p" style={{ fontSize: "35px", }}>
            {user?.fullname}
          </Typography>
          <div >
            <Typography variant="body1" color="#9b9696" component="p" style={{ display: "flex", fontSize: "20px", }}>
              <Typography style={{ marginRight: "20px", cursor: "pointer", }} onClick={handleOpenFollowing} >{user?.followings.length} đang theo dõi</Typography>
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
                <UserList listUser={user?.followings} title={"Đang theo dõi"} handleClose={handleCloseFollowing} />
              </Modal>
              <Typography style={{ cursor: "pointer", }} onClick={handleOpenFollower} >{user?.followers.length} người theo dõi</Typography>
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
                <UserList listUser={user?.followers} title={"Người theo dõi"} handleClose={handleCloseFollower} />
              </Modal>
            </Typography>
          </div>
        </div>
        {
          user?._id !== auth.user?._id &&
          <div className={classes.profile_button}>
            <Button startIcon={< RssFeed />} className={classes.button} onClick={handleFollow}>
              {followed ? "Hủy Theo dõi" : "Theo dõi"}
            </Button>
            <Button startIcon={<WhatsApp />} className={classes.button}>
              Nhắn tin
            </Button>
          </div>
        }
      </div>
    </Container>
  )
}