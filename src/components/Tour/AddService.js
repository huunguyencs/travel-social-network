import {
  Button,
  Card,
  CardContent,
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

import * as tourAction from '../../redux/actions/createTourAction';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { formStyles, tourdetailStyles } from '../../style';
// import { Link } from 'react-router-dom';
import { AddCircle, MoreVert } from '@material-ui/icons';
import { ReviewArea } from '../Service/ServiceItem';
import { success } from '../../redux/actions/alertAction';

const filter = createFilterOptions();

function ServiceItemAddForm(props) {
  const dispatch = useDispatch();

  const { location } = useSelector(state => state);

  const { type, indexDate, indexLocation } = props;
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(location.loadingServices);
  const [province, setProvince] = useState(null);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (province) {
      // console.log(location.services);
      setServices(
        location.services.filter(item => item.province._id === province._id)
      );
    }
    setLoading(false);
  }, [province, location.services]);

  const changeProvince = province => {
    setProvince(province);
  };

  const handleSubmit = () => {
    if (service) {
      let sv = service?._id
        ? {
            service: service,
            cost: parseInt(cost) || 0,
            description: ''
          }
        : {
            serviceName: service.name,
            cost: parseInt(cost) || 0,
            description: ''
          };
      if (type === 'date') {
        dispatch(
          tourAction.addServiceDate({
            service: sv,
            indexDate: indexDate
          })
        );
      } else {
        dispatch(
          tourAction.addServiceLocation({
            service: sv,
            indexDate: indexDate,
            indexLocation: indexLocation
          })
        );
      }
    }
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
                images: ['default1.jpg']
              });
            } else if (value && value.inputValue) {
              setService({
                name: value.inputValue,
                description: '',
                images: ['default1.jpg']
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
  const {
    service,
    isEdit,
    type,
    indexService,
    indexDate,
    indexLocation,
    joined
  } = props;

  const [cost, setCost] = useState(service.cost);
  const [description, setDescription] = useState(service.description);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    // console.log(cost);
    if (type === 'date') {
      dispatch(
        tourAction.updateServiceDate({
          cost: parseInt(cost),
          description: description,
          indexDate: indexDate,
          indexService: indexService
        })
      );
    } else {
      dispatch(
        tourAction.updateServiceLocation({
          cost: parseInt(cost),
          description: description,
          indexDate: indexDate,
          indexLocation: indexLocation,
          indexService: indexService
        })
      );
    }
    dispatch(success({ message: 'Cập nhật thành công!' }));
  };

  const classes = tourdetailStyles();

  return (
    <div style={{ padding: 15, paddingTop: 0 }}>
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
          <div className={classes.btnWrap}>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Cập nhật
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Typography>
            Chi phí: {new Intl.NumberFormat().format(cost * 1000)} VND
          </Typography>
          <Typography>Mô tả: {description}</Typography>
        </div>
      )}
      {!isEdit && joined && service?.service && (
        <ReviewArea id={service.service._id} />
      )}
    </div>
  );
}

export function ServiceCard(props) {
  const { service, index, isEdit, type, indexLocation, indexDate, joined } =
    props;

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
    if (type === 'date') {
      dispatch(
        tourAction.deleteServiceDate({
          indexService: index,
          indexDate: indexDate
        })
      );
    } else {
      dispatch(
        tourAction.deleteServiceLocation({
          indexService: index,
          indexDate: indexDate,
          indexLocation: indexLocation
        })
      );
    }
    // dispatch(tourAction.deleteService({ index: index }))
  };

  return (
    <Card className={classes.serviceContainer}>
      <Grid container>
        <Grid item md={5} sm={3} className={classes.imageLocation}>
          <CardMedia>
            <img
              src={service.service ? service.service.images[0] : 'default1.jpg'}
              alt="Service"
              className={classes.img}
            />
          </CardMedia>
        </Grid>
        <Grid item md={7} sm={9} xs={12}>
          <CardContent className={classes.contentContainer}>
            <div className={classes.locationContentContainer}>
              <div>
                <div>
                  {service.serviceName ? (
                    <Typography variant="h5" className={classes.locationName}>
                      {service.serviceName}
                    </Typography>
                  ) : (
                    <Typography variant="h5" className={classes.locationName}>
                      {service.service.name}
                    </Typography>
                  )}
                </div>
                <div>
                  <Typography>
                    Chi phí:{' '}
                    {new Intl.NumberFormat().format(service.cost * 1000)} VND
                  </Typography>
                </div>
                <Button onClick={handleShowDetail}>Chi tiết</Button>
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
                      {/* <Grow
                                                style={{ transformOrigin: "center bottom" }}
                                            > */}
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
                      {/* </Grow> */}
                    </Popper>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Collapse in={showDetail} style={{ width: '100%' }}>
            <DetailService
              service={service}
              isEdit={isEdit}
              type={type}
              indexService={index}
              indexDate={indexDate}
              indexLocation={indexLocation}
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

  const ref = React.createRef();

  const ServiceItemAddRef = React.forwardRef((props, ref) => (
    <ServiceItemAddForm innerRef={ref} {...props} />
  ));

  return (
    <div className={classes.paperContainer}>
      <div style={{ marginTop: 20 }} className={classes.center}>
        <ServiceItemAddRef ref={ref} {...props} />
      </div>
    </div>
  );
}
