import {
  Button,
  Card,
  CardMedia,
  ClickAwayListener,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapPicker from 'react-google-map-picker';
import * as tourAction from '../../redux/actions/createTourAction';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { formStyles, tourdetailStyles } from '../../style';
// import { Link } from 'react-router-dom';
import {
  AddCircle,
  MoreVert,
  Label,
  CameraAltOutlined
} from '@material-ui/icons';
import { ReviewArea } from '../Service/ServiceDetail';
import { success } from '../../redux/actions/alertAction';
import customAxios from '../../utils/fetchData';
import { checkImage, uploadImages } from '../../utils/uploadImage';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

const filter = createFilterOptions();

function MapPicker({ setPosition, position }) {
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(8);

  const defaultPosition = position || { lat: 15, lng: 108 };

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function handleChangeLocation(lat, lng) {
    setPosition({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  if (!show) {
    return 'Loading map...';
  }
  return (
    <GoogleMapPicker
      defaultLocation={defaultPosition}
      zoom={zoom}
      defaultZoom={8}
      mapTypeId="roadmap"
      style={{ height: 450 }}
      onChangeLocation={handleChangeLocation}
      onChangeZoom={handleChangeZoom}
      apiKey={KEY}
    />
  );
}

function ServiceAddContributeForm(props) {
  const dispatch = useDispatch();
  const { location, auth } = useSelector(state => state);

  const { indexDate, cProvince, cName, handleClose, time } = props;
  const [service, setService] = useState({
    name: cName,
    description: '',
    address: ''
  });
  const [position, setPosition] = useState({
    lat: 15,
    lng: 108
  });
  const [loading, setLoading] = useState(location.loadingServices);
  const [province, setProvince] = useState(cProvince);
  const [images, setImages] = useState([]);

  const changeProvince = province => {
    setProvince(province);
  };

  const handleChangeImageUpload = e => {
    let error = '';
    for (const file of e.target.files) {
      const check = checkImage(file);
      if (check !== '') {
        error = check;
        break;
      }
    }
    if (error === '') {
      setImages(oldImage => [...oldImage, ...e.target.files]);
    }
  };

  const removeImage = index => {
    setImages(oldImage => [
      ...oldImage.slice(0, index),
      ...oldImage.slice(index + 1)
    ]);
  };

  const handleSubmit = async () => {
    // console.log(service);
    let imgUploads = [];
    setLoading(true);
    if (images.length > 0) {
      imgUploads = await uploadImages(images);
    }

    console.log(service);
    console.log(province);
    console.log(position);
    customAxios(auth.token)
      .post('/service/contribute', {
        ...service,
        position: [position.lng, position.lat],
        province: province._id,
        province_name: province.fullname,
        images: imgUploads
      })
      .then(res => {
        const service = {
          service: res.data.service,
          cost: 0,
          description: '',
          time: time,
          indexDate: indexDate
        };
        dispatch(tourAction.addService(service));
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChange = e => {
    setService(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const classes = formStyles();

  return (
    <div>
      <div className={classes.center}>
        <Typography variant="h6">Thêm dịch vụ</Typography>
      </div>
      <Grid container>
        <Grid item md={6}>
          <Autocomplete
            id="choose-province"
            freeSolo
            options={location.provinces}
            loading={location.loading}
            getOptionLabel={option => option?.fullname}
            className={classes.autocomplete}
            onChange={(e, value) => changeProvince(value)}
            value={province}
            renderInput={params => (
              <TextField
                {...params}
                name="provinces"
                label="Chọn tỉnh thành"
                variant="outlined"
              />
            )}
          />
          <TextField
            value={service.name}
            onChange={handleChange}
            variant="outlined"
            label="Tên"
            name="name"
            id="name"
          />
          <TextField
            value={service.address}
            onChange={handleChange}
            variant="outlined"
            label="Mô tả vị trí"
            name="address"
            id="address"
          />
          <InputBase
            placeholder="Mô tả"
            rows={7}
            name="description"
            id="description"
            multiline
            className={classes.input}
            value={service.description}
            onChange={handleChange}
          />
          <div className={classes.composeOptions}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="input-image"
              name="images"
              multiple
              type="file"
              onChange={handleChangeImageUpload}
            />
            <label className={classes.composeOption} htmlFor="input-image">
              <CameraAltOutlined className={classes.composeIcon} />
              <span>Hình ảnh</span>
            </label>
          </div>
          <div className={classes.imageInputContainer}>
            {images.length > 0 && (
              <ScrollMenu height="300px">
                {images.map((item, index) => (
                  <img
                    key={index}
                    alt="Error"
                    className={classes.imageInput}
                    onClick={() => removeImage(index)}
                    src={URL.createObjectURL(item)}
                    title={'Xoá'}
                  />
                ))}
              </ScrollMenu>
            )}
          </div>
        </Grid>
        <Grid item md={6}>
          <MapPicker setPosition={setPosition} position={position} />
        </Grid>
      </Grid>

      <div style={{ marginTop: 10 }} className={classes.center}>
        <Button
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
          startIcon={<AddCircle />}
          disabled={loading}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

function ServiceItemAddForm(props) {
  const dispatch = useDispatch();

  const { location } = useSelector(state => state);

  const {
    indexDate,
    province,
    setProvince,
    setName,
    setContribute,
    handleClose,
    setTime,
    time
  } = props;
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(location.loadingServices);
  // const [province, setProvince] = useState(null);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (province?._id) {
      customAxios()
        .get(`/service/province/${province._id}`)
        .then(res => {
          setServices(res.data.services);
        });
    }
    setLoading(false);
  }, [province?._id]);

  const changeProvince = province => {
    setProvince(province);
  };

  const handleSubmit = () => {
    if (service) {
      if (service.isNew) {
        setName(service.name);
        setContribute(true);
        return;
      }
      const sv = {
        service: service,
        cost: parseInt(cost) || 0,
        time: time
      };
      dispatch(
        tourAction.addService({
          ...sv,
          indexDate: indexDate
        })
      );
    }
    handleClose();
    // console.log(service);
  };

  // const changeCost = (e, value) => {
  //     setCost(parseInt(value));
  // }

  const classes = formStyles();

  return (
    <div>
      <div className={classes.center}>
        <Typography variant="h6">Thêm dịch vụ</Typography>
      </div>
      <div className={classes.center}>
        <Autocomplete
          id="choose-province"
          freeSolo
          options={location.provinces}
          loading={location.loading}
          getOptionLabel={option => option?.fullname}
          className={classes.autocomplete}
          onChange={(e, value) => changeProvince(value)}
          value={province}
          renderInput={params => (
            <TextField
              {...params}
              name="provinces"
              label="Chọn tỉnh thành"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className={classes.center}>
        <Autocomplete
          value={service}
          onChange={(e, value) => {
            if (typeof value === 'string') {
              setService({
                name: value,
                description: '',
                images: ['/default1.jpg'],
                province: province,
                isNew: true
              });
            } else if (value && value.inputValue) {
              setService({
                name: value.inputValue,
                description: '',
                images: ['/default1.jpg'],
                province: province,
                isNew: true
              });
            } else {
              setService(value);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Thêm ${params.inputValue}`
              });
            }
            return filtered;
          }}
          id="choose-province"
          freeSolo
          options={services}
          loading={loading}
          getOptionLabel={option => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }

            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={option => option.name}
          className={classes.autocomplete}
          renderInput={params => (
            <TextField
              {...params}
              name="provinces"
              label="Chọn dịch vụ"
              variant="outlined"
            />
          )}
        />
      </div>
      <div className={classes.center}>
        <TextField
          className={classes.autocomplete}
          value={cost}
          onChange={e => {
            setCost(e.target.value);
            // console.log(e.target.value);
          }}
          variant="outlined"
          label="Chi phí"
          type={'number'}
          name="cost"
          id="cost"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">.000 VND</InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.center}>
        <TextField
          id="time"
          label="Thời gian"
          type="time"
          defaultValue="07:00"
          className={classes.textField}
          onChange={e => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
      </div>

      {service && (
        <div className={classes.description}>
          <Typography variant="body2">{service.description}</Typography>
        </div>
      )}
      <div style={{ marginTop: 10 }} className={classes.center}>
        <Button
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
          startIcon={<AddCircle />}
          disabled={!service}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

function DetailService(props) {
  const { service, isEdit, indexService, indexDate, joined } = props;

  const [cost, setCost] = useState(service.cost);
  const [description, setDescription] = useState(service.description);
  const [time, setTime] = useState(service.time);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    // console.log(cost);
    dispatch(
      tourAction.updateService({
        cost: parseInt(cost),
        description: description,
        indexDate: indexDate,
        index: indexService,
        time: time
      })
    );
    dispatch(success({ message: 'Cập nhật thành công!' }));
  };

  const classes = tourdetailStyles();

  return (
    <div style={{ padding: 5 }}>
      {isEdit ? (
        <div>
          <InputBase
            placeholder="Mô tả"
            title="Thông tin"
            variant="outlined"
            name="description"
            id="description"
            rows={5}
            className={classes.descriptionInput}
            // className={classes.hashtag}
            multiline
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            label="Chi phí (nghìn VND)"
            variant="outlined"
            name="cost"
            id="cost"
            className={classes.fullField}
            type={'number'}
            value={cost}
            onChange={e => setCost(e.target.value)}
          />
          <TextField
            id="time"
            label="Thời gian"
            type="time"
            defaultValue={service.time}
            onChange={e => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
          <div className={classes.btnWrap}>
            <Button
              onClick={handleUpdate}
              // variant="contained"
              className={classes.reviewBtn}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Typography>
            <Label style={{ fontSize: 15 }} />
            <span style={{ fontWeight: 500 }}>Chi phí: </span>{' '}
            {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          <Typography>
            <Label style={{ fontSize: 15 }} />{' '}
            <span style={{ fontWeight: 500 }}> Mô tả: </span> {description}
          </Typography>
        </div>
      )}
      {!isEdit && joined && service?.service && (
        <ReviewArea id={service.service._id} />
      )}
    </div>
  );
}

export function ServiceCard(props) {
  const { service, index, isEdit, indexDate, joined } = props;

  const classes = tourdetailStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(state => !state);
  };

  const dispatch = useDispatch();

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
  };

  const handleDelete = () => {
    dispatch(
      tourAction.deleteEvent({
        index: index,
        indexDate: indexDate
      })
    );
    handleCloseMenu();
    handleCloseDelete();
    // dispatch(tourAction.deleteService({ index: index }))
  };

  return (
    <Card className={classes.serviceContainer}>
      <Grid container>
        <Grid item md={5} sm={3} className={classes.imageLocation}>
          <CardMedia style={{ height: '100%' }}>
            <img
              src={
                service?.service?.images
                  ? service.service.images[0]
                  : '/default1.jpg'
              }
              alt="Service"
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <div className={classes.contentContainer}>
            <div className={classes.locationContentContainer}>
              <div>
                <div>
                  <Typography variant="h6" className={classes.locationName}>
                    {service.service?.name}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    Chi phí:{' '}
                    {new Intl.NumberFormat().format(service.cost * 1000)} VND
                  </Typography>
                </div>
                <Button
                  onClick={handleShowDetail}
                  className={classes.reviewBtn}
                >
                  Chi tiết
                </Button>
              </div>
              <div>
                {isEdit && (
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton
                      size="small"
                      onClick={handleShowMenu}
                      controls={anchorEl ? 'service-item-menu' : undefined}
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
                            <MenuItem onClick={handleShowDelete}>Xóa</MenuItem>
                            <Dialog
                              open={showDelete}
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
                                  onClick={handleDelete}
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
            </div>
          </div>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Collapse in={showDetail} style={{ width: '100%' }}>
            <DetailService
              service={service}
              isEdit={isEdit}
              indexService={index}
              indexDate={indexDate}
              joined={joined}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}

export default function AddService(props) {
  const classes = tourdetailStyles();

  const [contribute, setContribute] = useState(false);
  const [province, setProvince] = useState(null);
  const [name, setName] = useState('');
  const [time, setTime] = useState('07:00');

  return (
    <Paper className={classes.paperContainer} style={{ width: '60%' }}>
      <div style={{ marginTop: 10, borderTop: '1px solid #ded9d9' }}>
        {contribute ? (
          <ServiceAddContributeForm
            {...props}
            cProvince={province}
            cName={name}
            time={time}
          />
        ) : (
          <ServiceItemAddForm
            {...props}
            province={province}
            setProvince={setProvince}
            setName={setName}
            setContribute={setContribute}
            time={time}
            setTime={setTime}
          />
        )}
      </div>
    </Paper>
  );
}
