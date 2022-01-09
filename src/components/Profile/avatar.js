import React, { useEffect, useState } from "react";
import { WhatsApp, RssFeed } from "@material-ui/icons";
import { Avatar, Button, Container, Typography, Modal, Backdrop, CircularProgress } from "@material-ui/core";

import { profileStyles } from "../../style";
import UserList from "../modal/userList";
import ImageModal from "../modal/image";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { follow, unfollow } from "../../redux/callApi/userCall";



export default function Profile_Avatar(props) {

  const { user } = props;

  const { id } = useParams();
  const history = useHistory();

  const { auth, socket } = useSelector(state => state);

  const dispatch = useDispatch();


  const classes = profileStyles();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [stateFollow, setStateFollow] = useState({
    loading: false,
    error: false,
  })


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
      setStateFollow({
        loading: true,
        error: false
      })
      dispatch(unfollow(user, auth.token, socket, () => {
        setStateFollow({
          loading: false,
          error: true
        })
      }));
      setStateFollow({
        loading: false,
        error: false
      })
      setFollowed(false);

    }
    else {
      setStateFollow({
        loading: true,
        error: false
      })
      dispatch(follow(user, auth.token, socket, () => {
        setStateFollow({
          loading: false,
          error: true
        })
      }));
      setStateFollow({
        loading: false,
        error: false
      })
      setFollowed(true);
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

    if (isFollowed()) setFollowed(true);
    else setFollowed(false);
  }, [id, auth, history, user]);

  useEffect(() => {
    if (user?.fullname) {
      document.title = user.fullname;
    }
  }, [user])

  return (
    <Container className={classes.container}>
      {
        user &&
        <>
          <div>
            <img className={classes.profile_overImage} src={user.background} alt="cover" onClick={handleOpenCover} />
            <ImageModal
              open={openCover}
              handleClose={handleCloseCover}
              img={user.background}
            />
          </div>
          <div className={classes.profile_info}>
            <div className={classes.profile_avatar}>
              <Avatar className={classes.profile_avatar__img} src={user.avatar} alt="avatar" onClick={handleOpenAvatar} />
              <ImageModal
                open={openAvatar}
                handleClose={handleCloseAvatar}
                img={user.avatar}
              />
            </div>
            <div className={classes.infoUser}>
              <Typography variant="body1" component="p" className={classes.fullname}>
                {user.fullname}
              </Typography>
              <div variant="body1" component="p" className={classes.follow}>
                <Typography className={classes.followInfo} onClick={handleOpenFollowing} >{user.followings.length} đang theo dõi</Typography>
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
                <Typography className={classes.followInfo} onClick={handleOpenFollower} >{user.followers.length} người theo dõi</Typography>
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
              </div>
            </div>
            {
              user._id !== auth.user?._id &&
              <div className={classes.profile_button}>
                <Button startIcon={< RssFeed />} className={classes.button} onClick={handleFollow} disabled={!auth.token}>
                  {stateFollow.loading ? <CircularProgress /> : followed ? "Hủy Theo dõi" : "Theo dõi"}
                </Button>
                <Button startIcon={<WhatsApp />} className={classes.button} disabled={!auth.token}>
                  Nhắn tin
                </Button>
              </div>

            }
          </div>
        </>
      }
    </Container>
  )
}