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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapPicker from 'react-google-map-picker';
import { formStyles } from '../../style';
import AddLocMap from './AddLocMap';
import * as tourAction from '../../redux/actions/createTourAction';
import { AddCircle } from '@material-ui/icons';
import ServiceRecommend from '../Service/ServiceRecommend';
import { getRecommend } from '../../redux/callApi/serviceCall';
import customAxios from '../../utils/fetchData';

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

  const changeProvince = province => {
    setProvince(province);
  };

  const handleSubmit = () => {
    // console.log(service);
    setLoading(true);
    console.log(loc);
    console.log(province);
    console.log(position);
    customAxios(auth.token)
      .post('/location/contribute', {
        ...loc,
        position: [position.lng, position.lng],
        province: province._id,
        province_name: province.fullname
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

function AddLocationDefault(props) {
  const classes = formStyles();

  const dispatch = useDispatch();
  const { location, createTour, auth } = useSelector(state => state);
  const {
    indexDate,
    handleClose,
    currentProvince,
    setCurrentProvince,
    locations,
    setLocations,
    setIsContribute,
    setName,
    time,
    setTime
  } = props;
  const [loading, setLoading] = useState(location.loadingLocations);

  const [loc, setLoc] = useState(null);

  const [state, setState] = useState({
    zoom: 8,
    center: { lat: 14.489055527436275, lng: 107.96608963227854 }
  });

  const changeLoc = loc => {
    if (loc) {
      setLoc(loc);
      setState({
        zoom: 12,
        center: loc.position
      });
    }
  };

  const getLocation = useCallback(
    province => {
      customAxios(auth.token)
        .get(`/location/province/${province._id}`)
        .then(res => {
          setLocations(res.data.locations);
        });
      setState({
        zoom: 11,
        center: province?.position
      });
    },
    [setLocations, auth.token]
  );

  useEffect(() => {
    setLoading(true);
    if (currentProvince && locations?.length === 0) {
      getLocation(currentProvince);
    }
    setLoading(false);
  }, [getLocation, currentProvince, locations]);

  const setProvince = province => {
    if (!currentProvince || province?._id !== currentProvince._id) {
      setCurrentProvince(province);
      getLocation(province);
    }
  };

  const handleSubmit = e => {
    if (loc) {
      if (loc._id) {
        console.log(indexDate);
        dispatch(
          tourAction.addLocation({
            location: loc,
            indexDate: indexDate,
            time: time
          })
        );
        handleClose();
        // const position = loc.position;
        // if (position) dispatch(getRecommend(position));
      } else {
        setName(loc?.fullname);
        setIsContribute(true);
      }
    }
  };

  return (
    <Paper style={{ width: '60%' }}>
      <div className={classes.addLocationForm}>
        <div style={{ display: 'flex' }}>
          <Autocomplete
            id="choose-province"
            options={location.provinces}
            loading={location.loading}
            getOptionLabel={option => option?.fullname}
            className={classes.autocompleteProvince}
            onChange={(e, value) => setProvince(value)}
            value={currentProvince}
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
            loading={loading}
            className={classes.autocompleteProvince}
            onChange={(e, value) => {
              if (typeof value === 'string') {
                setLoc({
                  fullname: value,
                  image: '',
                  isContribute: true
                });
              } else if (value && value.inputValue) {
                setLoc({
                  fullname: value.inputValue,
                  image: '',
                  isContribute: true
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
        </div>
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
        <AddLocMap
          setLoc={setLoc}
          currentProvince={currentProvince}
          locations={locations}
          state={state}
          setState={setState}
          indexDate={props.indexDate}
        />
        {createTour.recommendService?.length > 0 && (
          <ServiceRecommend
            indexDate={props.indexDate}
            services={createTour.recommendService}
          />
        )}
      </div>
    </Paper>
  );
}

export default function AddLocation(props) {
  const [isContribute, setIsContribute] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('07:00');
  return isContribute ? (
    <AddLocationContribute {...props} name={name} time={time} />
  ) : (
    <AddLocationDefault
      {...props}
      setName={setName}
      time={time}
      setTime={setTime}
      setIsContribute={setIsContribute}
    />
  );
}
