import {
  Button,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapPicker from 'react-google-map-picker';
import { formStyles } from '../../style';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle, CameraAltOutlined } from '@material-ui/icons';
import ServiceRecommend from '../Service/ServiceRecommend';
import { getRecommend } from '../../redux/callApi/serviceCall';
import customAxios from '../../utils/fetchData';
import { checkImage, uploadImages } from '../../utils/uploadImage';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

const filter = createFilterOptions();

const KEY = process.env.REACT_APP_GOOGLE_MAP;

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

function AddLocationContribute(props) {
  const dispatch = useDispatch();
  const { location, auth } = useSelector(state => state);

  const { indexDate, currentProvince, name, handleClose, time } = props;
  const [loc, setLoc] = useState({
    fullname: name,
    information: ''
  });
  const [position, setPosition] = useState({
    lat: 15,
    lng: 108
  });
  const [loading, setLoading] = useState(location.loadingServices);
  const [province, setProvince] = useState(currentProvince);
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
    setLoading(true);
    console.log(loc);
    console.log(province);
    console.log(position);
    let imgUploads = [];
    if (images.length > 0) {
      imgUploads = await uploadImages(images);
    }
    customAxios(auth.token)
      .post('/location/contribute', {
        ...loc,
        position: [position.lng, position.lat],
        province: province._id,
        province_name: province.fullname,
        images: imgUploads
      })
      .then(res => {
        const tLoc = {
          location: res.data.location,
          cost: 0,
          description: '',
          time: time
        };
        dispatch(
          tourAction.addLocation({
            location: tLoc,
            indexDate: indexDate
          })
        );
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleChange = e => {
    setLoc(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const classes = formStyles();
  return (
    <Paper style={{ width: '60%' }}>
      <div className={classes.center}>
        <Typography variant="h6">Thêm địa điểm</Typography>
      </div>
      <Grid container>
        <Grid item md={6} lg={6}>
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
            value={loc.fullname}
            onChange={handleChange}
            variant="outlined"
            label="Tên"
            name="fullname"
            id="fullname"
          />
          <InputBase
            placeholder="Mô tả"
            rows={7}
            name="information"
            id="information"
            multiline
            className={classes.input}
            value={loc.information}
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
        <Grid item md={6} lg={6}>
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
    </Paper>
  );
}

function AddLocationDefault(props) {
  const classes = formStyles();

  const dispatch = useDispatch();
  const { location, createTour, auth } = useSelector(state => state);
  const {
    indexDate,
    handleClose,
    setIsContribute,
    setName,
    time,
    setTime,
    province,
    setProvince
  } = props;

  const [loc, setLoc] = useState(null);

  const [state, setState] = useState({
    zoom: 8,
    center: { lat: 14.489055527436275, lng: 107.96608963227854 }
  });

  const [locations, setLocations] = useState([]);

  const changeLoc = loc => {
    if (loc) {
      setLoc(loc);
      setState({
        zoom: 12,
        center: loc.position
      });
    }
  };

  useEffect(() => {
    if (province?._id) {
      customAxios(auth.token)
        .get(`/location/province/${province._id}`)
        .then(res => {
          setLocations(res.data.locations);
        });
      setState({
        zoom: 11,
        center: province?.position
      });
    }
  }, [province, auth.token]);

  const handleSubmit = e => {
    if (loc) {
      if (loc.isNew) {
        setName(loc?.fullname);
        setIsContribute(true);
        return;

        // const position = loc.position;
        // if (position) dispatch(getRecommend(position));
      }
      dispatch(
        tourAction.addLocation({
          location: loc,
          indexDate: indexDate,
          time: time
        })
      );
      handleClose();
    }
  };

  return (
    <Paper style={{ width: '60%' }}>
      <div className={classes.addLocationForm}>
        <Grid container>
          <Grid item md={6}>
            <Autocomplete
              id="choose-province"
              options={location.provinces}
              loading={location.loading}
              getOptionLabel={option => option?.fullname}
              className={classes.autocompleteProvince}
              onChange={(e, value) => setProvince(value)}
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

            <Autocomplete
              id="choose-location"
              options={locations}
              className={classes.autocompleteProvince}
              onChange={(e, value) => {
                if (typeof value === 'string') {
                  setLoc({
                    fullname: value,
                    image: '',
                    isNew: true
                  });
                } else if (value && value.inputValue) {
                  setLoc({
                    fullname: value.inputValue,
                    image: '',
                    isNew: true
                  });
                } else changeLoc(value);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    fullname: `Thêm ${params.inputValue}`
                  });
                }
                return filtered;
              }}
              freeSolo
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.fullname;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={option => option.fullname}
              value={loc}
              renderInput={params => (
                <TextField
                  {...params}
                  name="location"
                  label="Chọn địa điểm"
                  variant="outlined"
                />
              )}
            />
            <TextField
              id="time"
              label="Thời gian"
              variant="outlined"
              type="time"
              defaultValue={time}
              onChange={e => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />
            <div>
              <Button
                className={classes.button}
                type="submit"
                onClick={handleSubmit}
                startIcon={<AddCircle />}
                disabled={!loc}
                style={{ padding: 7, marginTop: 5 }}
              >
                Thêm
              </Button>
            </div>
          </Grid>

          <Grid item md={6}>
            <AddLocMap
              setLoc={setLoc}
              currentProvince={province}
              locations={locations}
              state={state}
              setState={setState}
              indexDate={props.indexDate}
              handleClose={handleClose}
            />
          </Grid>

          {createTour.recommendService?.length > 0 && (
            <ServiceRecommend
              indexDate={props.indexDate}
              services={createTour.recommendService}
            />
          )}
        </Grid>
      </div>
    </Paper>
  );
}

export default function AddLocation(props) {
  const [isContribute, setIsContribute] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('07:00');
  const [province, setProvince] = useState(null);
  return isContribute ? (
    <AddLocationContribute
      {...props}
      name={name}
      time={time}
      currentProvince={province}
    />
  ) : (
    <AddLocationDefault
      {...props}
      setName={setName}
      time={time}
      setTime={setTime}
      setIsContribute={setIsContribute}
      province={province}
      setProvince={setProvince}
    />
  );
}
