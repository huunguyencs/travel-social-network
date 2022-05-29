import {
  Button,
  Grid,
  Modal,
  Backdrop,
  Box,
  Fade,
  Dialog,
  DialogActions,
  Step,
  DialogTitle,
  CircularProgress,
  IconButton,
  TextField,
  InputAdornment,
  Stepper,
  StepContent,
  StepLabel,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tourdetailStyles } from '../../style';
// import AddLocationForm from "../Forms/AddLocation";
// import Location from './Location';
import * as tourAction from '../../redux/actions/createTourAction';
import { useHistory } from 'react-router-dom';
import UpdateDateForm from '../Forms/UpdateDate';
import UpdateTourInfo from '../Forms/UpdateInfoCreateTour';
import { convertDateToStr } from '../../utils/date';
import { saveTour, updateTour } from '../../redux/callApi/tourCall';
import { getProvinces } from '../../redux/callApi/locationCall';
// import AddService from './AddService';
// import AddLocation from './AddLocation';
import {
  AddCircle,
  Close,
  Save,
  Update,
  LocationOnOutlined
} from '@material-ui/icons';
import ChangeImageTour from './ChangeImageTour';
import { error } from '../../redux/actions/alertAction';
import * as alertAction from '../../redux/actions/alertAction';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import ServiceCard from './Service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DetailDate from './DetailDate';

// function EditDetailDate(props) {
//   const { indexDate } = props;
//   const classes = tourdetailStyles();

//   const [addService, setAddService] = useState(false);
//   const [addLocation, setAddLocation] = useState(false);
//   const [currentProvince, setCurrentProvince] = useState(null);
//   const [locations, setLocations] = useState([]);

//   const showAddService = () => {
//     setAddService(true);
//   };

//   const closeAddService = () => {
//     setAddService(false);
//   };

//   const showAddLocation = () => {
//     setAddLocation(true);
//   };

//   const closeAddLocation = () => {
//     setAddLocation(false);
//   };

//   const refAddService = React.createRef();

//   const refAddLoc = React.createRef();

//   const AddServiceRef = React.forwardRef((props, ref) => (
//     <AddService {...props} innerRef={ref} />
//   ));

//   const AddLocationRef = React.forwardRef((props, ref) => (
//     <AddLocation {...props} innerRef={ref} />
//   ));

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <Button
//         variant="contained"
//         onClick={showAddService}
//         className={classes.button}
//       >
//         Thêm dịch vụ
//       </Button>
//       <Modal
//         aria-labelledby="add-service"
//         aria-describedby="add-service-modal"
//         className={classes.modal}
//         open={addService}
//         onClose={closeAddService}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500
//         }}
//       >
//         <AddServiceRef
//           ref={refAddService}
//           handleClose={closeAddService}
//           indexDate={indexDate}
//         />
//       </Modal>
//       <Button
//         variant="contained"
//         onClick={showAddLocation}
//         className={classes.button}
//       >
//         Thêm địa điểm
//       </Button>
//       <Modal
//         aria-labelledby="add-location"
//         aria-describedby="add-location-modal"
//         className={classes.modal}
//         open={addLocation}
//         onClose={closeAddLocation}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500
//         }}
//       >
//         <AddLocationRef
//           ref={refAddLoc}
//           handleClose={closeAddLocation}
//           indexDate={indexDate}
//           currentProvince={currentProvince}
//           locations={locations}
//           setCurrentProvince={setCurrentProvince}
//           setLocations={setLocations}
//         />
//       </Modal>
//     </div>
//   );
// }

function EditBaseDate(props) {
  const { tourDate, date } = props;

  const [text, setText] = useState(tourDate.description || '');
  const [cost, setCost] = useState(tourDate.cost || 0);

  // const handleChange = e => {
  //   setText(e.target.value);
  // };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    dispatch(
      tourAction.updateDesciptionDate({
        indexDate: date,
        description: text,
        cost: parseInt(cost)
      })
    );
    dispatch(alertAction.success({ message: 'Cập nhật thành công!' }));
  };

  const classes = tourdetailStyles();

  return (
    <div className={classes.paperDetailDate}>
      <Typography className={classes.detailDateTittle}> Tổng quan ngày</Typography>
      <div className={classes.tourDateWrapper}>
        <div>
          <ReactQuill
            value={text}
            onChange={e => setText(e)}
            className={classes.reactQuillTour}
            placeholder="Chi tiết"
          />
          <div className={classes.btnWrap}>
            <TextField
              label="Chi phí"
              title="Chi phí"
              variant="outlined"
              name="cost"
              id="cost"
              type="number"
              className={classes.fullField}
              style={{backgroundColor:"white"}}
              value={cost}
              onChange={e => setCost(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">.000 VND</InputAdornment>
                )
              }}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              className={classes.addDayCustom}
            >
              Cập nhật
            </Button>
          </div>
        </div>

        {/* <AddService type="date" indexDate={date} /> */}
      </div>
    </div>
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

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`
//   };
// }

export default function AddTour(props) {
  const { isUpdate } = props;

  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const dispatch = useDispatch();
  const { createTour, location, auth, socket } = useSelector(state => state);

  const [tourInfo, setTourInfo] = useState({
    name: createTour.name,
    content: '',
    hashtags: [],
    isPublic: false
  });
  const [idx, setIdx] = useState(0);
  const [showUpdateDate, setShowUpdateDate] = useState(false);
  const [showDeleteDate, setShowDeteleDate] = useState(-1);
  const [showReset, setShowReset] = useState(false);

  const handleShowReset = () => {
    setShowReset(true);
  };

  const handleCloseReset = () => {
    setShowReset(false);
  };

  const handleAddDay = () => {
    dispatch(tourAction.addDate());
  };

  const handleSave = async () => {
    if (createTour.tour.length === 0) return;
    setState({
      loading: true,
      error: false
    });
    if (!createTour.image || createTour.image === '') {
      setState({
        loading: false,
        error: true
      });
      return;
    }

    dispatch(
      saveTour(
        {
          ...tourInfo,
          tour: createTour.tour,
          cost: createTour.cost
        },
        createTour.image,
        auth.token,
        socket,
        () => {
          setState({
            loading: false,
            error: false
          });
          history.push('/tour');
        },
        () => {
          setState({
            loading: false,
            error: false
          });
          dispatch(error({ message: 'Có lỗi xảy ra' }));
        }
      )
    );
  };

  const handleUpdate = async () => {
    if (createTour.tour.length === 0) return;
    setState({
      loading: true,
      error: false
    });

    if (!createTour.image || createTour.image === '') {
      setState({
        loading: false,
        error: true
      });
      return;
    }

    dispatch(
      updateTour(
        createTour._id,
        {
          ...tourInfo,
          tour: createTour.tour,
          cost: createTour.cost
        },
        createTour.image,
        auth.token,
        () => {
          // console.log("done");
          setState({
            loading: false,
            error: false
          });
          history.push('/tour');
        },
        () => {
          setState({
            loading: false,
            error: false
          });
          dispatch(error({ error: 'Có lỗi xảy ra' }));
        }
      )
    );
  };

  const handleDeleteDate = index => {
    if (index < 0) return;
    dispatch(tourAction.deleteDate({ indexDate: index }));
    if (idx === index) {
      if (index === 0) {
        setIdx(0);
      } else setIdx(index - 1);
    }
    handleCloseDelete();
  };

  const handleShowUpdate = () => {
    setShowUpdateDate(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateDate(false);
  };

  const handleShowDelete = index => {
    if (createTour.tour?.length <= 1) return;
    setShowDeteleDate(index);
  };

  const handleCloseDelete = () => {
    setShowDeteleDate(-1);
  };

  useEffect(() => {
    if (location.provinces?.length === 0) {
      dispatch(getProvinces());
    }
  }, [dispatch, location.provinces]);

  const refUdDate = React.createRef();
  const refEditDetailDate = React.createRef();

  const UpdateDateRef = React.forwardRef((props, ref) => (
    <UpdateDateForm {...props} innerRef={ref} />
  ));

  const EditBaseDateRef = React.forwardRef((props, ref) => (
    <EditBaseDate {...props} innerRef={ref} />
  ));

  const handleReset = () => {
    dispatch(
      tourAction.createTour({
        name: createTour.name,
        date: createTour.tour[0]?.date
      })
    );
    handleCloseReset();
  };

  const classes = tourdetailStyles();

  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <>
      {(!isUpdate || (isUpdate && createTour.tour && createTour.tour[0])) && (
        <div className={classes.container}>
          <Grid container className={classes.tourDetailContainer}>
            <div className={classes.tourInfoGeneral}>
              <Grid container>
                <Grid item md={8} sm={7} xs={12}>
                  <UpdateTourInfo
                    tourInfo={tourInfo}
                    setTourInfo={setTourInfo}
                    image={createTour.image}
                    cost={createTour.cost}
                  />
                </Grid>
                <Grid item md={4} sm={5} xs={12}>
                  <div style={{ padding: 20, maxHeight: 250, overflow:"hidden" }}>
                    <ChangeImageTour />
                  </div>
                  {state.error && (
                    <span
                      style={{
                        fontSize: '15px',
                        color: 'red',
                        marginInline: '20px',
                        marginTop: '10px'
                      }}
                    >
                      Bạn cần thêm ảnh
                    </span>
                  )}
                  <div className={classes.tourRight}>
                    <div className={classes.tourButtons}>
                      <Button
                        onClick={handleShowReset}
                        className={classes.reviewBtn}
                      >
                        Reset
                      </Button>
                      <div className={classes.center}>
                        <Dialog
                          open={showReset}
                          onClose={handleCloseDelete}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {'Bạn có chắc chắn muốn reset tour?'}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleCloseReset}>Hủy</Button>
                            <Button
                              onClick={handleReset}
                              className={classes.delete}
                            >
                              Reset
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <Button
                        onClick={isUpdate ? handleUpdate : handleSave}
                        startIcon={<Save />}
                        className={classes.reviewBtn}
                      >
                        {state.loading ? (
                          <CircularProgress size="25px" color="inherit" />
                        ) : (
                          'Lưu hành trình'
                        )}
                      </Button>
                    </div>
                    <div className={classes.tourChoose}></div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={classes.createTourDates}>
              <Stepper
                activeStep={idx}
                orientation="vertical"
                className={classes.datesWrapper}
              >
                {createTour.tour.map((item, index) => (
                  <Step
                    key={index}
                    onClick={() => setIdx(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      Chi tiết lịch trình ngày {convertDateToStr(item.date)}
                      <IconButton
                        size="small"
                        onClick={() => handleShowDelete(index)}
                        style={{ marginLeft: 20 }}
                      >
                        <Close />
                      </IconButton>
                      <Button
                        onClick={handleShowUpdate}
                        className={classes.addDay}
                        startIcon={<Update />}
                      >
                        Thay đổi ngày
                      </Button>
                      <Button
                        className={classes.addDay}
                        onClick={handleAddDay}
                        startIcon={<AddCircle />}
                      >
                        Thêm ngày
                      </Button>
                    </StepLabel>
                    <StepContent>
                      <Grid container style={{border:"1px solid #a9a9a9", backgroundColor: "#ebf3f0"}}>
                        <Grid item md={5} sm={12} xs={12}>
                          <EditBaseDateRef
                            ref={refEditDetailDate}
                            date={idx}
                            tourDate={createTour.tour[idx]}
                          />
                        </Grid>
                        <Grid item md={7} sm={12} xs={12}>
                          <DetailDate
                            indexDate={idx}
                            events={createTour.tour[idx].events}
                          />
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className={classes.center}>
              <Dialog
                open={showDeleteDate !== -1}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'Bạn có chắc chắn muốn xóa ngày?'}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDelete}>Hủy</Button>
                  <Button
                    onClick={() => handleDeleteDate(showDeleteDate)}
                    className={classes.delete}
                  >
                    Xóa
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showUpdateDate}
              className={classes.modal}
              onClose={handleCloseUpdate}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={showUpdateDate}>
                <UpdateDateRef
                  ref={refUdDate}
                  handleClose={handleCloseUpdate}
                  indexDate={idx}
                  currentDate={createTour.tour[idx].date}
                />
              </Fade>
            </Modal>
          </Grid>
        </div>
      )}
    </>
  );
}
