import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Typography,
  Backdrop,
  Fade,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  TextField,
  CircularProgress,
  CardHeader,
  Avatar,
  InputAdornment
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Close, MoreVert } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { tourdetailStyles } from '../../style';
import CreateReviewForm from '../Forms/CreateReview';
import EditLocationForm from '../Forms/EditLocation';
import * as tourAction from '../../redux/actions/createTourAction';
import { success } from '../../redux/actions/alertAction';
import customAxios from '../../utils/fetchData';
import { timeAgo } from '../../utils/date';
import { AvatarGroup, Rating } from '@material-ui/lab';
import { SeeMoreText } from '../SeeMoreText';
import ImageList from '../Modal/ImageList';
import AddService, { ServiceCard } from './AddService';
import UserList from '../Modal/UserList';
import { joinLocation, unjoinLocation } from '../../redux/callApi/tourCall';
import Loading from '../Loading';

function ReviewList(props) {
  const { reviews, handleClose } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getReview = async reviews => {
    setLoading(true);
    setError(false);
    try {
      await customAxios()
        .post(`/post/list`, {
          list: reviews
        })
        .then(res => {
          setPosts(res.data.posts);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getReview(reviews);
  }, [reviews]);

  return (
    <Paper style={{ width: 700 }}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <IconButton size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          Review
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            height: '60vh',
            overflowY: 'auto'
          }}
        >
          {loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 100
              }}
            >
              <Loading />
            </div>
          )}
          {error && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 100
              }}
            >
              <Typography>Có lỗi xảy ra</Typography>
            </div>
          )}
          {!error &&
            posts.map(post => (
              <Card
                style={{
                  width: 600,
                  borderRadius: 10,
                  border: '1px solid #ddd'
                }}
                key={post._id}
              >
                <CardHeader
                  avatar={<Avatar alt="avatar" src={post.userId.avatar} />}
                  title={
                    <Typography
                      style={{ fontWeight: 500 }}
                      component={Link}
                      to={`/u/${post.userId._id}`}
                    >
                      {post.userId.fullname}
                    </Typography>
                  }
                  subheader={
                    <Link to={`/post/${post._id}`}>
                      {timeAgo(new Date(post.createdAt))}
                    </Link>
                  }
                />
                {post.images.length > 0 && (
                  <CardMedia>
                    <ImageList
                      imageList={post.images}
                      show2Image={true}
                      defaultHeight={300}
                    />
                  </CardMedia>
                )}
                <Rating
                  name="location-rating"
                  value={post.rate}
                  readOnly
                  style={{ marginBottom: 10, marginInline: 20 }}
                />
                <CardContent style={{ marginInline: 10 }}>
                  <SeeMoreText
                    variant="body1"
                    maxText={100}
                    text={post.content}
                  />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Paper>
  );
}

function Detail(props) {
  const classes = tourdetailStyles();
  const dispatch = useDispatch();

  const { location, isEdit, indexDate, indexLocation, handleClose, joined } =
    props;

  const [description, setDescription] = useState();
  const [time, setTime] = useState(location.time);
  const [cost, setCost] = useState(location.cost);

  useEffect(() => {
    setDescription(location.description);
    setTime(location.time);
    setCost(location.cost);
  }, [location]);

  const handleUpdateInfo = () => {
    dispatch(
      tourAction.updateLocation({
        cost: parseInt(cost),
        description: description,
        indexDate: indexDate,
        indexLocation: indexLocation,
        time: time
      })
    );
    dispatch(success({ message: 'Cập nhật thành công!' }));
  };

  return (
    <Paper className={classes.paperDetailDate}>
      <Grid container>
        <Grid item md={6} sm={12} xs={12}>
          {isEdit ? (
            <>
              <div style={{ overflowY: 'auto', height: '70vh' }}>
                <Typography
                  variant="h5"
                  style={{ textAlign: 'center', marginTop: 10 }}
                >
                  {location.locationName
                    ? location.locationName
                    : location.location.fullname}
                </Typography>
                <div style={{ margin: 20 }}>
                  <InputBase
                    placeholder="Ghi chú"
                    title="Ghi chú"
                    variant="outlined"
                    name="description"
                    id="description"
                    className={classes.descriptionInput}
                    multiline
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <TextField
                    label="Thời gian"
                    title="Thời gian"
                    variant="outlined"
                    name="time"
                    id="time"
                    className={classes.fullField}
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                  <TextField
                    label="Chi phí"
                    title="Chi phí"
                    variant="outlined"
                    name="cost"
                    id="cost"
                    type="number"
                    className={classes.fullField}
                    // className={classes.hashtag}
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">.000 VND</InputAdornment>
                      )
                    }}
                  />
                  <div className={classes.btnWrap}>
                    <Button
                      onClick={handleUpdateInfo}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </div>
                </div>
                <AddService
                  type="location"
                  indexDate={indexDate}
                  indexLocation={indexLocation}
                />
              </div>
            </>
          ) : (
            <div style={{ overflowY: 'auto', height: '70vh' }}>
              <Typography
                variant="h5"
                style={{ textAlign: 'center', marginTop: 10 }}
              >
                {location.locationName
                  ? location.locationName
                  : location.location.fullname}
              </Typography>
              <div style={{ padding: 20 }}>
                <Typography>
                  Chi phí:{' '}
                  {new Intl.NumberFormat().format(location.cost * 1000)} VND
                </Typography>
                <Typography>Thời gian: {location.time}</Typography>
                <Typography>Mô tả: {location.description}</Typography>
              </div>
            </div>
          )}
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <div style={{ overflowY: 'auto', height: '70vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <Typography
                variant="h5"
                style={{ textAlign: 'center', marginTop: 10 }}
              >
                Danh sách dịch vụ
              </Typography>
              <div>
                <IconButton size="small" onClick={handleClose}>
                  <Close />
                </IconButton>
              </div>
            </div>

            {location.services.map((item, index) => (
              <ServiceCard
                joined={joined}
                type="location"
                key={index}
                service={item}
                index={index}
                isEdit={isEdit}
                indexDate={indexDate}
                indexLocation={indexLocation}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Location(props) {
  const classes = tourdetailStyles();

  const { user, token } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const {
    location,
    isEdit,
    isSave,
    tourDateId,
    indexDate,
    indexLocation,
    addReview,
    joined,
    joinIds,
    isOwn,
    updateJoinLocation
  } = props;

  const [showDetail, setShowDetail] = useState(false);
  const [showCreateRv, setShowCreateRv] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editLoc, setEditLoc] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState();
  const [joinedLoc, setJoinedLoc] = useState(false);

  const handleJoin = () => {
    if (!user) return;
    setLoadingJoin(true);
    setJoinedLoc(true);
    var prevJoin = location.joinIds;
    updateJoinLocation([...prevJoin, user], tourDateId, location._id);
    dispatch(
      joinLocation(
        token,
        tourDateId,
        location._id,
        () => {
          setLoadingJoin(false);
          setJoinedLoc(true);
        },
        () => {
          setLoadingJoin(false);
          if (joinLocation) {
            setJoinedLoc(false);
            updateJoinLocation(prevJoin, tourDateId, location._id);
          }
        }
      )
    );
  };

  const handleUnJoin = () => {
    if (!user) return;
    setLoadingJoin(true);
    setJoinedLoc(false);
    var prevJoin = location.joinIds;
    var newJoin = prevJoin.filter(item => item._id !== user._id);
    updateJoinLocation(newJoin, tourDateId, location._id);
    dispatch(
      unjoinLocation(
        token,
        tourDateId,
        location._id,
        () => {
          setLoadingJoin(false);
          setJoinedLoc(false);
        },
        () => {
          setLoadingJoin(false);
          if (!joined) {
            setJoinedLoc(true);
            updateJoinLocation(prevJoin, tourDateId, location._id);
          }
        }
      )
    );
  };

  const handleShowJoin = () => {
    setShowJoin(true);
  };

  const handleCloseJoin = () => {
    setShowJoin(false);
  };

  const checkJoinLocation = () => {
    if (!user) return false;
    let find = location.joinIds.findIndex(ele => ele._id === user._id);
    return find >= 0;
  };

  // const joinLocation = checkJoinLocation();
  useEffect(() => {
    if (!isSave || !user) return;
    let find = location.joinIds.findIndex(ele => ele._id === user._id);
    setJoinedLoc(find >= 0);
  }, [location.joinIds, user, isSave]);

  useEffect(() => {
    setShowDetail(false);
  }, [indexDate]);

  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowEdit = () => {
    setEditLoc(true);
  };

  const handleCloseEdit = () => {
    setEditLoc(false);
    handleCloseMenu();
  };

  const handleShow = () => {
    setShowCreateRv(true);
  };

  const handleClose = () => {
    setShowCreateRv(false);
  };

  const handleShowDelete = () => {
    setShowDeleteLocation(true);
  };
  const handleCloseDelete = () => {
    setShowDeleteLocation(false);
  };

  const handleDeleteLocation = () => {
    dispatch(
      tourAction.deleteLocation({
        indexDate: indexDate,
        indexLocation: indexLocation
      })
    );
    handleCloseDelete();
    handleCloseMenu();
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleShowReview = () => {
    setShowReview(true);
  };

  const handleCloseReview = () => {
    setShowReview(false);
  };

  const refEdit = React.createRef();
  const refCr = React.createRef();
  const ref = React.createRef();
  const refDetail = React.createRef();
  const refUser = React.createRef();

  const EditLocationRef = React.forwardRef((props, ref) => (
    <EditLocationForm {...props} innerRef={ref} />
  ));

  const CreateReviewRef = React.forwardRef((props, ref) => (
    <CreateReviewForm {...props} innerRef={ref} />
  ));

  const ReviewRef = React.forwardRef((props, ref) => (
    <ReviewList {...props} innerRef={ref} />
  ));

  const DetailRef = React.forwardRef((props, ref) => (
    <Detail {...props} innerRef={ref} />
  ));

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  return (
    <Card className={classes.cardContainer}>
      <Grid container>
        <Grid item md={4} sm={3} className={classes.imageLocation}>
          <CardMedia>
            {location.locationName ? (
              <img
                src={'default2.jpg'}
                alt="Đang tải..."
                className={classes.img}
              />
            ) : (
              <img
                src={location.location.images[0]}
                alt="Đang tải..."
                className={classes.img}
              />
            )}
          </CardMedia>
        </Grid>
        <Grid item md={8} sm={9} xs={12}>
          <CardContent style={{ padding: 0 }}>
            <div className={classes.locationContentContainer}>
              <div style={{ margin: 20 }}>
                {location.locationName ? (
                  <Typography variant="h5" className={classes.locationName}>
                    {location.locationName}
                  </Typography>
                ) : (
                  <>
                    <div>
                      <Typography
                        variant="h5"
                        className={classes.locationName}
                        component={Link}
                        to={`/location/${location.location.name}`}
                      >
                        {location.location.fullname}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={'/province/' + location.location.province.name}
                      >
                        {location.location.province.fullname}
                      </Typography>
                    </div>
                  </>
                )}
                {isSave && (
                  <>
                    {location.location && (joined || checkJoinLocation()) && (
                      <div>
                        {' '}
                        <Button
                          className={classes.reviewBtn}
                          onClick={handleShow}
                        >
                          Tạo Review
                        </Button>{' '}
                      </div>
                    )}
                    {location.postId?.length > 0 && (
                      <Button onClick={handleShowReview}>Xem review</Button>
                    )}
                    {!joined && !isOwn && (
                      <>
                        {loadingJoin ? (
                          <CircularProgress size={18} />
                        ) : (
                          <Button
                            onClick={joinedLoc ? handleUnJoin : handleJoin}
                          >
                            {joinedLoc ? 'Huỷ tham gia' : 'Tham gia'}
                          </Button>
                        )}
                      </>
                    )}
                    <Typography>Thành viên tham gia</Typography>
                    <AvatarGroup
                      max={4}
                      onClick={handleShowJoin}
                      style={{ cursor: 'pointer' }}
                    >
                      {joinIds.concat(location.joinIds).map(user => (
                        <Avatar
                          src={user.avatar}
                          alt={'A'}
                          key={user._id}
                          style={{ height: 20, width: 20 }}
                        />
                      ))}
                    </AvatarGroup>
                    <Modal
                      aria-labelledby="like"
                      aria-describedby="user-like-this-post"
                      className={classes.modal}
                      open={showJoin}
                      onClose={handleCloseJoin}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500
                      }}
                    >
                      <UserListRef
                        ref={refUser}
                        listUser={joinIds.concat(location.joinIds)}
                        title={'Đã tham gia'}
                        handleClose={handleCloseJoin}
                      />
                    </Modal>
                  </>
                )}
                <Button onClick={handleShowDetail}>Chi tiết</Button>
              </div>
              {isEdit && (
                <div>
                  <div className={classes.tourHeader}>
                    <IconButton
                      aria-label="settings"
                      onClick={handleShowMenu}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  </div>
                  <Popper
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    disablePortal
                  >
                    {/* <Grow
                                            style={{ transformOrigin: "center bottom" }}
                                        > */}
                    <ClickAwayListener onClickAway={handleCloseMenu}>
                      <Paper>
                        <MenuList>
                          {location.location && (
                            <>
                              <MenuItem onClick={handleShowEdit}>
                                Chỉnh sửa
                              </MenuItem>
                              <Modal
                                aria-labelledby="transition-modal-edit"
                                aria-describedby="transition-modal-edit-description"
                                open={editLoc}
                                className={classes.modal}
                                onClose={handleCloseEdit}
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                  timeout: 500
                                }}
                              >
                                <Fade in={editLoc}>
                                  <EditLocationRef
                                    ref={refEdit}
                                    handleCloseParent={handleCloseMenu}
                                    handleClose={handleCloseEdit}
                                    indexDate={indexDate}
                                    indexLocation={indexLocation}
                                    location={location}
                                  />
                                </Fade>
                              </Modal>
                            </>
                          )}
                          <MenuItem onClick={handleShowDelete}>Xóa</MenuItem>
                          <Dialog
                            open={showDeleteLocation}
                            onClose={handleCloseDelete}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {'Bạn có chắc chắn muốn xóa?'}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={handleCloseDelete}>Hủy</Button>
                              <Button
                                onClick={handleDeleteLocation}
                                className={classes.delete}
                              >
                                Xóa
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                    {/* </Grow> */}
                  </Popper>
                </div>
              )}
            </div>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showCreateRv}
              className={classes.modal}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showCreateRv}>
                <CreateReviewRef
                  ref={refCr}
                  location={location.location}
                  cost={location.cost}
                  handleClose={handleClose}
                  tourDateId={tourDateId}
                  indexLocation={location._id}
                  addReview={addReview}
                />
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-review"
              aria-describedby="transition-modal-review-description"
              open={showReview}
              className={classes.modal}
              onClose={handleCloseReview}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showReview}>
                <ReviewRef
                  ref={ref}
                  reviews={location.postId}
                  handleClose={handleCloseReview}
                />
              </Fade>
            </Modal>
          </CardContent>
        </Grid>

        {/* <Collapse in={showDetail} style={{ width: "100%" }}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Detail
                            location={location}
                            isEdit={isEdit}
                            indexDate={indexDate}
                            indexLocation={indexLocation}
                        />
                    </Grid>
                </Collapse> */}
        <Modal
          aria-labelledby="transition-modal-detail"
          aria-describedby="transition-modal-detail-description"
          open={showDetail}
          className={classes.modal}
          onClose={handleCloseDetail}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={showDetail}>
            <DetailRef
              ref={refDetail}
              location={location}
              isEdit={isEdit}
              indexDate={indexDate}
              indexLocation={indexLocation}
              handleClose={handleCloseDetail}
              joined={joined}
            />
          </Fade>
        </Modal>
      </Grid>
    </Card>
  );
}
