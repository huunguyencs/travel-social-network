import {
  Button,
  Card,
  Collapse,
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
import { Close, MoreVert, Label } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { tourdetailStyles } from '../../style';
import CreateReviewForm from '../Forms/CreateReview';
import EditLocationForm from '../Forms/EditLocation';
import * as tourAction from '../../redux/actions/createTourAction';
import { success } from '../../redux/actions/alertAction';
import customAxios from '../../utils/fetchData';
import { timeAgo } from '../../utils/date';
import { Rating } from '@material-ui/lab';
import { SeeMoreText } from '../SeeMoreText';
import ImageList from '../Modal/ImageList';
// import { ServiceCard } from './AddService';

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
              <CircularProgress />
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
                      isPost={false}
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

  const { location, isEdit, indexDate, indexLocation } = props;

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
              <div>
                <div style={{ margin: 10 }}>
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
                    id="time"
                    label="Thời gian"
                    type="time"
                    variant="outlined"
                    defaultValue={time}
                    onChange={e => setTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
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
                      className={classes.button}
                    >
                      Cập nhật
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              {/* <div className={classes.locationImages}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="https://res.cloudinary.com/dqxvfu5k1/image/upload/v1649898282/k4hoq9jblhx65msx64c8.jpg"
                  alt="loading ..."
                ></img>
              </div> */}
              <div style={{ padding: 20 }}>
                <Typography>
                  <Label style={{ fontSize: 15 }} />
                  <span style={{ fontWeight: 500 }}>Chi phí: </span>{' '}
                  {new Intl.NumberFormat().format(location.cost * 1000)} VND
                </Typography>
                <Typography>
                  <Label style={{ fontSize: 15 }} />
                  <span style={{ fontWeight: 500 }}>Thời gian: </span>{' '}
                  {location.time}
                </Typography>
                <Typography>
                  <Label style={{ fontSize: 15 }} />
                  <span style={{ fontWeight: 500 }}>Mô tả: </span>{' '}
                  {location.description}
                </Typography>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Location(props) {
  const classes = tourdetailStyles();
  
  const dispatch = useDispatch();

  const {
    location,
    isEdit,
    isSave,
    tourDateId,
    indexDate,
    indexLocation,
    addReview,
    joined
  } = props;
  console.log("location", location)
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateRv, setShowCreateRv] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editLoc, setEditLoc] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [showReview, setShowReview] = useState(false);

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
      tourAction.deleteEvent({
        indexDate: indexDate,
        index: indexLocation
      })
    );
    handleCloseDelete();
    handleCloseMenu();
  };

  const handleShowDetail = () => {
    setShowDetail(state => !state);
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

  return (
    <Card className={classes.cardContainer}>
      <Grid container>
        <Grid item md={4} sm={3} className={classes.imageLocation}>
          <CardMedia style={{ height: '100%' }}>
            {location.locationName ? (
              <img
                src={'/default2.jpg'}
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
                    <div style={{ display: 'flex' }}>
                      {location.location && (
                        <div>
                          <Button
                            className={classes.reviewBtn}
                            onClick={handleShow}
                          >
                            Tạo Review
                          </Button>
                        </div>
                      )}
                      {location.postId?.length > 0 && (
                        <Button
                          className={classes.reviewBtn}
                          onClick={handleShowReview}
                        >
                          Xem review
                        </Button>
                      )}
                    </div>
                  </>
                )}
                <Button
                  className={classes.reviewBtn}
                  onClick={handleShowDetail}
                >
                  Chi tiết
                </Button>
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
        <Grid item md={12} sm={12} xs={12}>
          <Collapse in={showDetail} style={{ width: '100%' }}>
            <DetailRef
              ref={refDetail}
              location={location}
              isEdit={isEdit}
              indexDate={indexDate}
              indexLocation={indexLocation}
              handleClose={handleShowDetail}
              joined={joined}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
