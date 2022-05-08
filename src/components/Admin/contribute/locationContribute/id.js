import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Grid
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AddImageHorizontal from '../../../Input/AddImageHorizontal';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NotFound } from '../../../../page/404';
import customAxios from '../../../../utils/fetchData';
import Loading from '../../../Loading';
import Validator, { isFloat, nameid } from '../../../../utils/validator';
import { adminStyles } from '../../../../style';
import MapPicker from '../../../Map/MapPicker';
import { uploadImages } from '../../../../utils/uploadImage';
import { useDispatch } from 'react-redux';
import { getProvinces } from '../../../../redux/callApi/locationCall';
import FormLocationAdmin from '../../Location/Form';

function AdminLocationContributeDetail() {
  const classes = adminStyles();

  const { subpage } = useParams();
  const { provinces } = useSelector(state => state.location);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.auth);
  const [picker, setPicker] = useState(false);
  const [provinceOpt, setProvinceOpt] = useState(null);
  const [imgs, setImgs] = useState(location?.images || []);

  const handleChange = e => {
    setLocation(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleChangePicker = e => {
    setPicker(state => !state);
  };

  const changePositionText = e => {
    setLocation(state => ({
      ...state,
      position: {
        ...state.position,
        [e.target.name]: e.target.value
      }
    }));
  };

  const changePosition = position => {
    setLocation(state => ({
      ...state,
      position: position
    }));
  };

  const getLocation = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios(token)
      .get(`/location_contribute/${id}`)
      .then(res => {
        setLocation(res.data.location);
        setState({
          notFound: false,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          notFound: false,
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    getLocation(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Địa điểm được đóng góp';
  }, []);

  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(getProvinces());
    }
  }, [provinces.length, dispatch]);

  // useEffect(() => {
  //   if (location.province && provinces.length > 0) {
  //     let temp = provinces.find(item => item._id === location.province._id);
  //     setProvinceOpt(temp);
  //   }
  // }, [location.province, provinces]);

  const rules = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên không được bỏ trống!'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên đầy đủ không được bỏ trống!'
    },
    {
      field: 'information',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mô tả không được bỏ trống!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'Tên không hợp lệ'
    }
  ];
  const rulesPosition = [
    {
      field: 'lat',
      method: isFloat,
      validWhen: true,
      message: 'Vị trí không hợp lệ!'
    },
    {
      field: 'lng',
      method: isFloat,
      validWhen: true,
      message: 'Vị trí không hợp lệ!'
    }
  ];

  const validator = new Validator(rules);
  const validatorPos = new Validator(rulesPosition);

  const onClickSubmit = async () => {
    setLoading(true);
    const err = validator.validate(location);
    const errPos = validatorPos.validate(location.position);
    const totalErr = {
      ...err,
      position: errPos
    };

    setErrors(totalErr);

    if (imgs.length === 0) {
      setErrors(err => ({
        ...err,
        images: 'Chèn thêm ảnh'
      }));
      return;
    }

    const imageUpload = await uploadImages(imgs);

    if (Object.keys(err).length === 0 && Object.keys(errPos).length === 0) {

    }
    setLoading(false);
  };

  return (
    <div>
      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <Paper
          style={{
            marginTop: 120,
            marginInline: 50,
            marginBottom: 30,
            padding: 30
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
          >
            <Loading />
          </div>
        </Paper>
      ) : state.error ? (
        <Paper
          style={{
            marginTop: 120,
            marginInline: 50,
            marginBottom: 30,
            padding: 30
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
          >
            Có lỗi xảy ra
          </div>
        </Paper>
      ) : (
        location && (
          location?.contributeId ?
            //Chỉnh sửa định địa thêm đóng góp
            <>
              <Grid container>
                <Grid item md={6}>
                  <Paper
                    style={{
                      marginTop: 120,
                      marginInline: 50,
                      marginBottom: 30,
                      padding: 30
                    }}
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
                    >
                      <Typography variant="h4">
                        Địa điểm được đóng góp
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        disabled
                        label="Tên đầy đủ"
                        variant="outlined"
                        name="fullname"
                        onChange={handleChange}
                        value={location.fullname}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.fullname)}
                        helperText={errors?.fullname}
                      />

                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%', marginRight: 20 }}>
                          <TextField
                            disabled
                            label="Vĩ độ"
                            variant="outlined"
                            name="lat"
                            onChange={changePositionText}
                            value={location.position.lat}
                            className={classes.fullField}
                            required
                            error={Boolean(errors?.position?.lat)}
                            helperText={errors?.position?.lat}
                            InputProps={{
                              readOnly: picker
                            }}
                          />
                        </div>
                        <div style={{ width: '50%', marginLeft: 20 }}>
                          <TextField
                            disabled
                            label="Kinh độ"
                            variant="outlined"
                            name="lng"
                            onChange={changePositionText}
                            value={location.position.lng}
                            className={classes.fullField}
                            required
                            error={Boolean(errors?.position?.lng)}
                            helperText={errors?.position?.lng}
                            InputProps={{
                              readOnly: picker
                            }}
                          />
                        </div>
                      </div>

                      <Autocomplete
                        disabled
                        id="set-province"
                        options={provinces}
                        loading={provinces.length === 0}
                        value={provinceOpt}
                        getOptionLabel={option => option.fullname}
                        onChange={(e, value) => setProvinceOpt(value)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Tỉnh"
                            placeholder="Tỉnh thành"
                            className={classes.fullField}
                            required
                          />
                        )}
                      />
                      <AddImageHorizontal images={imgs} />
                      <span style={{ color: 'red' }}>{errors?.images}</span>
                      <TextField
                        disabled
                        label="Thông tin"
                        variant="outlined"
                        name="information"
                        multiline
                        onChange={handleChange}
                        value={location.information}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.information)}
                        helperText={errors?.information}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={6}>
                  <Paper
                    style={{
                      marginTop: 120,
                      marginInline: 50,
                      marginBottom: 30,
                      padding: 30
                    }}
                  >
                    <FormLocationAdmin
                      location={location}
                      setLocation={setLocation}
                      mode="edit"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </> :
            // Thêm địa điểm
            <>
              <Paper
                style={{
                  marginTop: 120,
                  marginInline: 50,
                  marginBottom: 30,
                  padding: 30
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
                >
                  <Typography variant="h4">
                    Địa điểm được đóng góp
                  </Typography>
                </div>
                <div>
                  <TextField
                    label="Tên"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    value={location.name}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                  />
                  <TextField
                    label="Tên đầy đủ"
                    variant="outlined"
                    name="fullname"
                    onChange={handleChange}
                    value={location.fullname}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.fullname)}
                    helperText={errors?.fullname}
                  />

                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', marginRight: 20 }}>
                      <TextField
                        label="Vĩ độ"
                        variant="outlined"
                        name="lat"
                        onChange={changePositionText}
                        value={location.position.lat}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.position?.lat)}
                        helperText={errors?.position?.lat}
                        InputProps={{
                          readOnly: picker
                        }}
                      />
                    </div>
                    <div style={{ width: '50%', marginLeft: 20 }}>
                      <TextField
                        label="Kinh độ"
                        variant="outlined"
                        name="lng"
                        onChange={changePositionText}
                        value={location.position.lng}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.position?.lng)}
                        helperText={errors?.position?.lng}
                        InputProps={{
                          readOnly: picker
                        }}
                      />
                    </div>
                  </div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={picker}
                        onChange={handleChangePicker}
                        name="picker-checker"
                        color="primary"
                      />
                    }
                    label="Chọn vị trí trên bản đồ"
                  />
                  {picker && (
                    <div>
                      <MapPicker
                        position={{
                          lat: parseFloat(location.position.lat),
                          lng: parseFloat(location.position.lng)
                        }}
                        setPosition={changePosition}
                        height={400}
                      />
                    </div>
                  )}

                  <Autocomplete
                    id="set-province"
                    options={provinces}
                    loading={provinces.length === 0}
                    value={provinceOpt}
                    getOptionLabel={option => option.fullname}
                    onChange={(e, value) => setProvinceOpt(value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tỉnh"
                        placeholder="Tỉnh thành"
                        className={classes.fullField}
                        required
                      />
                    )}
                  />
                  <AddImageHorizontal images={imgs} onChange={setImgs} maxImage={10} />
                  <span style={{ color: 'red' }}>{errors?.images}</span>
                  <TextField
                    label="Thông tin"
                    variant="outlined"
                    name="information"
                    multiline
                    onChange={handleChange}
                    value={location.information}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.information)}
                    helperText={errors?.information}
                  />
                </div>
                <div className={classes.btnRight}>
                  <Button
                    onClick={onClickSubmit}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Thêm'}
                  </Button>
                </div>
              </Paper>

            </>
        )
      )}
    </div>
  );
}

export default AdminLocationContributeDetail;
