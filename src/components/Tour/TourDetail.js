import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
  Paper,
  IconButton,
  Modal,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  makeStyles,
  Box,
  Tab,
  Tabs,
  Fade
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useEffect, useMemo, useState } from 'react';
import { tourdetailStyles } from '../../style';
import Location from './Location';
import { convertDateToStr, timeAgo } from '../../utils/date';
import MapCard from '../Map/MapCard';
import ImageModal from '../Modal/Image';
import {
  MoreVert,
  LocationOnOutlined,
  Label,
  Delete,
  Edit,
  FlagOutlined
} from '@material-ui/icons';
import { ServiceCard } from './AddService';
import { Link } from 'react-router-dom';
import UserList from '../Modal/UserList';
import { useDispatch, useSelector } from 'react-redux';
// import { joinTour, unJoinTour } from '../../redux/callApi/tourCall';
import SpeedDialButton from '../SpeedDialBtn';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deleteTour } from '../../redux/callApi/tourCall';
import TourRecommendCard from '../Card/TourRecommendCard';
import { SeeMoreText } from '../SeeMoreText';
import InviteTour from '../Modal/InviteTour';

function DetailDate(props) {
  const { tourDate, date, joined } = props;

  const classes = tourdetailStyles();

  return (
    <Paper className={classes.paperDetailDate}>
      <Grid container style={{ padding: 16 }}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography>
            <Label style={{ fontSize: 15 }} />{' '}
            <span style={{ fontWeight: 500 }}> Mô tả: </span>{' '}
            {tourDate.description}
          </Typography>
          <Typography>
            <Label style={{ fontSize: 15 }} />
            <span style={{ fontWeight: 500 }}>Chi phí: </span>{' '}
            {new Intl.NumberFormat().format(tourDate.cost * 1000)} VND
          </Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              style={{ textAlign: 'center', marginTop: 10 }}
            >
              Danh sách dịch vụ
            </Typography>
          </div>
          <div className={classes.servicesWrapperMaxHeight}>
            {tourDate.services.map((item, index) => (
              <ServiceCard
                joined={joined}
                type="date"
                key={index}
                service={item}
                index={index}
                isEdit={false}
                indexDate={date}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    zIndex: 1,
    color: '#63B191',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #63B191'
  },
  active: {
    backgroundColor: '#63B191',
    color: 'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundColor: 'white',
    color: '#63B191'
  }
});
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <LocationOnOutlined style={{ width: 25 }} />
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function TourDetail(props) {
  const { tour, isOwn, setTour, joined, setJoined, joinLoc } = props;
  
  const classes = tourdetailStyles();

  //   const dispatch = useDispatch();
  // const { auth } = useSelector(state => state);

  const dispatch = useDispatch();
  const { auth, socket } = useSelector(state => state);

  // const history = useHistory();
  // const dispatch = useDispatch();

  const [idx, setIdx] = useState(0);
  const [position, setPosition] = useState(null);
  const [locations, setLocations] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [showUserJoin, setShowUserJoin] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const handleShowJoin = () => {
    setShowUserJoin(true);
  };

  const handleCloseJoin = () => {
    setShowUserJoin(false);
  };

  const handleShowInvite = () => {
    setShowInvite(true);
  };

  const handleCloseInvite = () => {
    setShowInvite(false);
  };

  const handleShowImage = () => {
    setShowImage(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const isOld = useMemo(() => {
    const startDate = new Date(tour.tour[0]?.date);
    const now = new Date();
    return startDate < now;
  }, [tour.tour]);

  const createReview = (id, index_loc, tourdate_id) => {
    setTour(state => ({
      ...state,
      tour: state.tour.map(item =>
        item._id === tourdate_id
          ? {
              ...item,
              locations: item.locations.map((location, index) =>
                index === index_loc
                  ? {
                      ...location,
                      postId: [...location.postId, id]
                    }
                  : location
              )
            }
          : item
      )
    }));
  };

  const updateJoin = joins => {
    setTour({
      ...tour,
      joinIds: joins
    });
  };

  const updateJoinLocation = (joins, idDate, idLocation) => {
    setTour(tour => ({
      ...tour,
      tour: tour.tour.map(item =>
        item._id === idDate
          ? {
              ...item,
              locations: item.locations.map(loc =>
                loc._id === idLocation
                  ? {
                      ...loc,
                      joinIds: joins
                    }
                  : loc
              )
            }
          : item
      )
    }));
  };

  // const handleJoin = () => {
  //   setState({
  //     loadingJoin: true,
  //     error: false
  //   });
  //   setJoined(true);
  //   var prevJoin = tour.joinIds;
  //   updateJoin([...prevJoin, auth.user]);
  //   dispatch(
  //     joinTour(
  //       tour._id,
  //       auth.token,
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: false
  //         });
  //       },
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: true
  //         });
  //         if (joined) {
  //           setJoined(false);
  //           updateJoin(prevJoin);
  //         }
  //       }
  //     )
  //   );
  // };

  // const handleUnJoin = () => {
  //   setState({
  //     loadingJoin: true,
  //     error: false
  //   });
  //   setJoined(false);
  //   var prevJoin = tour.joinIds;
  //   var newJoin = prevJoin.filter(user => user._id !== auth.user._id);
  //   updateJoin(newJoin);

  //   dispatch(
  //     unJoinTour(
  //       tour._id,
  //       auth.token,
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: false
  //         });
  //       },
  //       () => {
  //         setState({
  //           loadingJoin: false,
  //           error: true
  //         });
  //         if (!joined) {
  //           setJoined(true);
  //           updateJoin(prevJoin);
  //         }
  //       }
  //     )
  //   );
  // };
  useEffect(() => {
    if (tour && tour.tour[idx].locations.length > 0) {
      setPosition(tour.tour[idx].locations[0].location.position);
    }
  }, [tour, idx]);
  useEffect(() => {
    var locs = tour.tour[idx].locations
      .filter(item => item.location)
      .map(item => item.location);
    setLocations(locs);
  }, [tour, idx]);

  const refDetail = React.createRef();
  const refUser = React.createRef();
  const refInvite = React.createRef();

  const DetailDateRef = React.forwardRef((props, ref) => (
    <DetailDate {...props} innerRef={ref} />
  ));

  const UserListRef = React.forwardRef((props, ref) => (
    <UserList {...props} innerRef={ref} />
  ));

  const InviteRef = React.forwardRef((props, ref) => (
    <InviteTour {...props} innerRef={ref} />
  ));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    handleCloseMenu();
  };
  const handleDeleteTour = () => {
    setState({
      loading: true,
      error: false
    });
    dispatch(
      deleteTour(
        tour,
        auth.token,
        socket,
        () => {
          setState({
            loading: false,
            error: false
          });
          setShowDelete(false);
          handleCloseMenu();
        },
        () => {
          setState({
            loading: false,
            error: true
          });
        }
      )
    );
  };
  return (
    <>
      {tour ? (
        <Grid container className={classes.container}>
          <SpeedDialButton />
          <Grid container className={classes.tourDetailContainer}>
            <Grid container className={classes.tourInfos}>
              <Grid item lg={9} md={8} sm={12} xs={12}>
                <div className={classes.tourInfoLeftImage}>
                  <img
                    src={tour.image}
                    className={classes.image}
                    width="100%"
                    alt="Can not load"
                    onClick={handleShowImage}
                  />
                  <ImageModal
                    open={showImage}
                    handleClose={handleCloseImage}
                    img={tour.image}
                  />
                </div>
                <div className={classes.tourLeftInfo}>
                  <Typography variant="h6" className={classes.tourName}>
                    {tour.name}
                  </Typography>
                  <div className={classes.tourTime}>
                    <div className={classes.timeItem}>
                      <Typography
                        className={classes.timeItemTitle}
                        style={{ color: '#63B191' }}
                      >
                        Điểm khởi hành
                      </Typography>
                      <div>
                        <IconButton style={{ padding: 0 }}>
                          <LocationOnOutlined className={classes.iconStart} />
                        </IconButton>
                      </div>
                      <Typography className={classes.timeItemLocation}>
                        {tour.locations[0]}
                      </Typography>
                      <Typography className={classes.timeItemDate}>
                        {convertDateToStr(tour.tour[0]?.date)}
                      </Typography>
                    </div>
                    <div className={classes.timeItem}>
                      <Typography
                        className={classes.timeItemTitle}
                        style={{ color: '#f44336' }}
                      >
                        Điểm kết thúc
                      </Typography>
                      <div className={classes.connectLine}>
                        <IconButton style={{ padding: 0 }}>
                          <FlagOutlined className={classes.iconEnd} />
                        </IconButton>
                      </div>
                      <Typography className={classes.timeItemLocation}>
                        {tour.locations[tour.locations.length - 1]}
                      </Typography>
                      <Typography className={classes.timeItemDate}>
                        {convertDateToStr(tour.tour[tour.tour.length - 1].date)}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingBottom: 20,
                      borderBottom: '1px solid #0000001f',
                      minHeight: 70
                    }}
                  >
                    <SeeMoreText
                      variant="body1"
                      maxText={300}
                      text={tour.content}
                    />
                  </div>
                  <div className={classes.hashtagWrap}>
                    {tour.hashtags.map((hashtag, index) => (
                      <Typography
                        className={classes.hashtag}
                        key={index}
                        component={Link}
                        to={`/tour/hashtag?hashtag=${hashtag}`}
                      >
                        #{hashtag}
                      </Typography>
                    ))}
                  </div>
                  <Typography variant="body1">
                    Tổng chi phí:{' '}
                    {new Intl.NumberFormat().format(tour.cost * 1000)} VND
                  </Typography>
                  {/* {!isOwn && joinLoc === 0 && (
                    <>
                      {state.loading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          onClick={joined ? handleUnJoin : handleJoin}
                          disabled={isOld}
                        >
                          {joined ? 'Hủy tham gia' : 'Tham gia'}
                        </Button>
                      )}
                    </>
                  )} */}
                  <div>
                    <Typography>Danh sách tham gia toàn bộ tour:</Typography>
                    <AvatarGroup
                      max={4}
                      onClick={handleShowJoin}
                      style={{ cursor: 'pointer' }}
                    >
                      {tour.joinIds.map(user => (
                        <Avatar
                          src={user.avatar}
                          alt={'A'}
                          key={user._id}
                          style={{ height: 30, width: 30 }}
                        />
                      ))}
                    </AvatarGroup>
                    <Modal
                      aria-labelledby="like"
                      aria-describedby="user-like-this-post"
                      className={classes.modal}
                      open={showUserJoin}
                      onClose={handleCloseJoin}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500
                      }}
                    >
                      <UserListRef
                        ref={refUser}
                        listUser={tour.joinIds}
                        title={'Đã tham gia'}
                        handleClose={handleCloseJoin}
                      />
                    </Modal>
                  </div>
                </div>
              </Grid>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Card className={classes.cardInfoUser}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={tour.userId.fullname}
                        src={tour.userId.avatar}
                        aria-label="avatar"
                      />
                    }
                    action={
                      <>
                        {auth.user && auth.user._id === tour.userId._id && (
                          <>
                            <IconButton
                              aria-label="settings"
                              onClick={handleShowMenu}
                              className={classes.action}
                              size="small"
                              controls={anchorEl ? 'post-menu' : undefined}
                            >
                              <MoreVert />
                            </IconButton>
                            <Popper
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClose={handleCloseMenu}
                              disablePortal
                            >
                              <ClickAwayListener onClickAway={handleCloseMenu}>
                                <Paper>
                                  <MenuList>
                                    <MenuItem
                                       onClick={handleShowInvite}
                                      >
                                        <Edit className={classes.menuIcon} />{' '}
                                        Mời thành viên
                                    </MenuItem>
                                    <Modal
                                      aria-labelledby="invite"
                                      aria-describedby="user-invite"
                                      className={classes.modal}
                                      open={showInvite}
                                      onClose={handleCloseInvite}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500
                                      }}
                                    >
                                      <Fade in={showInvite}>
                                        <InviteRef ref={refInvite}  handleClose={handleCloseInvite} usersParent={tour.joinIds} id={tour._id}/>
                                      </Fade>
                                    </Modal>
                                    <MenuItem
                                      component={Link}
                                      to={'?edit=true'}
                                    >
                                      <Edit className={classes.menuIcon} />{' '}
                                      Chỉnh sửa hành trình
                                    </MenuItem>
                                    <MenuItem onClick={handleShowDelete}>
                                      {' '}
                                      <Delete className={classes.menuIcon} />
                                      Xóa hành trình
                                    </MenuItem>
                                    <Dialog
                                      open={showDelete}
                                      onClose={handleCloseDelete}
                                      aria-labelledby="show-delete-dialog"
                                      aria-describedby="show-delete-dialog-description"
                                    >
                                      <DialogTitle id="alert-dialog-title">
                                        {'Bạn có chắc chắn muốn xóa?'}
                                      </DialogTitle>
                                      <DialogContent>
                                        Bạn sẽ không thể khôi phục lại dữ liệu
                                        sau khi xóa!
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleCloseDelete}>
                                          Hủy
                                        </Button>
                                        <Button
                                          onClick={handleDeleteTour}
                                          className={classes.delete}
                                        >
                                          {state.loading ? (
                                            <CircularProgress
                                              size={15}
                                              color="inherit"
                                            />
                                          ) : (
                                            'Xóa'
                                          )}
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </MenuList>
                                </Paper>
                              </ClickAwayListener>
                            </Popper>
                          </>
                        )}
                      </>
                    }
                    title={
                      <Typography
                        className={classes.username}
                        component={Link}
                        to={`/u/${tour.userId._id}`}
                      >
                        {tour.userId?.fullname}
                      </Typography>
                    }
                    subheader={
                      <Typography className={classes.subheader}>
                        {timeAgo(new Date(tour.createdAt))}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography className={classes.tourName}>
                      {tour.name}
                    </Typography>
                    {/* <Typography>Thời gian: {convertDateToStr(volunteer.date[0].date)}</Typography>
                                            <Typography>Địa điểm xuất phát: {volunteer.location[0].location.fullname}</Typography>
                                            <Typography>Thể loại: {volunteer.type}</Typography> */}
                  </CardContent>
                </Card>
                <div className={classes.tourRecommend}>
                  <TourRecommendCard id={tour._id} />
                </div>
              </Grid>
            </Grid>
            <Grid container className={classes.tourDates}>
              <Grid
                item
                lg={9}
                md={8}
                sm={12}
                xs={12}
                className={classes.tourDatesLeft}
              >
                <Stepper
                  activeStep={idx}
                  orientation="vertical"
                  className={classes.datesWrapper}
                >
                  {tour.tour.map((item, index) => (
                    <Step
                      key={index}
                      onClick={() => setIdx(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <StepLabel StepIconComponent={ColorlibStepIcon}>
                        Chi tiết lịch trình ngày {convertDateToStr(item.date)}
                      </StepLabel>
                      <StepContent>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="auto"
                          aria-label="scrollable auto tabs example"
                        >
                          <Tab label="Tổng quan ngày" {...a11yProps(0)} />
                          <Tab label="Các địa điểm" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel
                          value={value}
                          index={0}
                          className={classes.tabPanel}
                        >
                          <DetailDateRef
                            ref={refDetail}
                            date={idx}
                            tourDate={tour.tour[idx]}
                            joined={joined}
                          />
                        </TabPanel>
                        <TabPanel
                          value={value}
                          index={1}
                          className={classes.tabPanel}
                        >
                          {tour.tour[idx].locations.map((item, index) => (
                            <Location
                              location={item}
                              indexDate={idx}
                              tourDateId={tour.tour[idx]._id}
                              indexLocation={index}
                              edit={false}
                              key={index}
                              isSave={true}
                              isEdit={false}
                              addReview={createReview}
                              joined={joined}
                              joinIds={tour.joinIds}
                              isOwn={isOwn}
                              updateJoinLocation={updateJoinLocation}
                              joinLoc={joinLoc}
                              isOld={isOld}
                            />
                          ))}
                        </TabPanel>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid
                item
                lg={3}
                md={4}
                sm={12}
                xs={12}
                className={classes.tourDatesRight}
              >
                <div className={classes.map}>
                  {position ? (
                    <MapCard
                      position={position}
                      zoom={12}
                      locations={locations}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress color={'inherit'} />
      )}
    </>
  );
}
