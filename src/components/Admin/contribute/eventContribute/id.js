import {
  Typography,
  Paper,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Grid
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AddImageHorizontal from '../../../Input/AddImageHorizontal';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Validator, { isFloat, nameid } from '../../../../utils/validator';
import { uploadImages } from '../../../../utils/uploadImage';
import { adminStyles } from '../../../../style';
import FormEventAdmin from '../../Event/Form';
import { NotFound } from '../../../../page/404';
import customAxios from '../../../../utils/fetchData';
import Loading from '../../../Loading';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminEventContributeDetail() {
  const classes = adminStyles();

  const { subpage } = useParams();

  const [event, setEvent] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });
  const { provinces } = useSelector(state => state.location);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState(event?.images || []);
  const [provinceOpt, setProvinceOpt] = useState(null);

  const handleChange = e => {
    setEvent(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const isInt = value => {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  };

  const rules = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên không được bỏ trống'
    },
    {
      field: 'fullname',
      method: 'isEmpty',
      validWhen: false,
      message: 'Tên đầy đủ không được bỏ trống!'
    },
    {
      field: 'description',
      method: 'isEmpty',
      validWhen: false,
      message: 'Mô tả không được bỏ trống!'
    },
    {
      field: 'name',
      method: nameid,
      validWhen: true,
      message: 'Tên không hợp lệ'
    },
    {
      field: 'time',
      method: isInt,
      validWhen: true,
      message: 'Thời gian không hợp lệ'
    }
  ];

  const validator = new Validator(rules);

  const onClickSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const err = validator.validate(event);

    setErrors(err);

    if (imgs.length === 0) {
      setErrors(err => ({
        ...err,
        images: 'Chèn thêm ảnh'
      }));
      return;
    }

    const imageUpload = await uploadImages(imgs);

    if (Object.keys(err).length === 0) {

    }
    setLoading(false);
  };

  const getEvent = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios()
      .get(`/event_contribute/${id}`)
      .then(res => {
        setEvent(res.data.event);
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
    getEvent(subpage);
    console.log(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Sự kiện được đóng góp';
  }, []);

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
        event && (
          event?.contributeId ?
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
                        Sự kiện được đóng góp chỉnh sửa
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        disabled
                        label="Tên đầy đủ"
                        variant="outlined"
                        name="fullname"
                        onChange={handleChange}
                        value={event.fullname}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.fullname)}
                        helperText={errors?.fullname}
                      />
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
                      <AddImageHorizontal images={imgs} onChange={setImgs} maxImage={10} />
                      <span style={{ color: 'red' }}>{errors?.images}</span>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%', marginRight: 20 }}>
                          <TextField
                            disabled
                            label="Thời gian"
                            variant="outlined"
                            name="time"
                            onChange={handleChange}
                            value={event.time}
                            className={classes.fullField}
                            required
                            error={Boolean(errors?.time)}
                            helperText={errors?.time}
                          />
                        </div>
                        <FormControl
                          variant="outlined"
                          style={{ width: '50%', marginLeft: 20 }}
                          className={classes.fullField}
                        >
                          <InputLabel id="calendar-type-select-label">Loại lịch</InputLabel>
                          <Select
                            disabled
                            labelId="calendar-type-select-label"
                            id="calendar-type-select"
                            value={event.calendarType}
                            onChange={handleChange}
                            label="Loại lịch"
                            name="calendarType"
                          >
                            <MenuItem value={false}>Âm lịch</MenuItem>
                            <MenuItem value={true}>Dương lịch</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <TextField
                        disabled
                        label="Mô tả thời gian"
                        variant="outlined"
                        name="timedes"
                        onChange={handleChange}
                        value={event.timedes}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.timedes)}
                        helperText={errors?.timedes}
                      />
                      <TextField
                        disabled
                        label="Thông tin"
                        variant="outlined"
                        name="description"
                        multiline
                        onChange={handleChange}
                        value={event.description}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.description)}
                        helperText={errors?.description}
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
                    <FormEventAdmin
                      event={event}
                      setEvent={setEvent}
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
                    value={event.name}
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
                    value={event.fullname}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.fullname)}
                    helperText={errors?.fullname}
                  />
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
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', marginRight: 20 }}>
                      <TextField
                        label="Thời gian"
                        variant="outlined"
                        name="time"
                        onChange={handleChange}
                        value={event.time}
                        className={classes.fullField}
                        required
                        error={Boolean(errors?.time)}
                        helperText={errors?.time}
                      />
                    </div>
                    <FormControl
                      variant="outlined"
                      style={{ width: '50%', marginLeft: 20 }}
                      className={classes.fullField}
                    >
                      <InputLabel id="calendar-type-select-label">Loại lịch</InputLabel>
                      <Select
                        labelId="calendar-type-select-label"
                        id="calendar-type-select"
                        value={event.calendarType}
                        onChange={handleChange}
                        label="Loại lịch"
                        name="calendarType"
                      >
                        <MenuItem value={false}>Âm lịch</MenuItem>
                        <MenuItem value={true}>Dương lịch</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    label="Mô tả thời gian"
                    variant="outlined"
                    name="timedes"
                    onChange={handleChange}
                    value={event.timedes}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.timedes)}
                    helperText={errors?.timedes}
                  />
                  <TextField
                    label="Thông tin"
                    variant="outlined"
                    name="description"
                    multiline
                    onChange={handleChange}
                    value={event.description}
                    className={classes.fullField}
                    required
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
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
      )
      }
    </div >
  );
}
