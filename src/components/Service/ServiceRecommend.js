import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
  Drawer
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import * as tourAction from '../../redux/actions/createTourAction';
import { useDispatch } from 'react-redux';
import { tourdetailStyles } from '../../style';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ServiceDetail } from './ServiceDetail';
import customAxios from '../../utils/fetchData';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ServiceRecommendItem({ service, indexDate }) {
  const classes = tourdetailStyles();
  const dispatch = useDispatch();

  const [ser, setSer] = useState(service);

  const [state, setState] = useState({
    loading: false,
    error: false
  });
  const [open, setOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  const addToDate = () => {
    dispatch(
      tourAction.addServiceDate({
        service: {
          service,
          cost: 0
        },
        indexDate: indexDate
      })
    );
  };

  const getServiceDetail = useCallback(() => {
    if (!ser.rate) {
      setState({
        loading: true,
        error: false
      });
      customAxios()
        .get(`/service/rate/${ser._id}`)
        .then(res => {
          setSer({
            ...ser,
            rate: res.data.rate,
            attribute: res.data.attribute,
            id: ser._id
          });
        });
    }
  }, [ser]);

  useEffect(() => {
    if (open && !ser.rate) {
      getServiceDetail();
    }
  }, [open, getServiceDetail, ser]);
  return (
    <>
      <Card>
        <CardMedia
          className={classes.media}
          image={ser?.images[0]}
          title={ser?.name}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            onClick={toggleDrawer(true)}
            className={classes.serviceName}
          >
            {ser?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ser?.andress}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ser?.cost}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttonWrapper}>
          <Button
            size="small"
            onClick={addToDate}
            className={classes.reviewBtn}
          >
            Thêm dịch vụ
          </Button>
        </CardActions>
      </Card>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 10 }}
      >
        <ServiceDetail
          service={ser}
          state={state}
          getServiceDetail={getServiceDetail}
          handleClose={toggleDrawer}
        />
      </Drawer>
    </>
  );
}

export default function ServiceRecommend({ services, indexDate }) {
  const classes = tourdetailStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = services.length;
  const handleNext = () => {
    if (activeStep === maxSteps - 1) setActiveStep(0);
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) setActiveStep(maxSteps - 1);
    else setActiveStep(activeStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };
  return (
    <div className={classes.serviceRecommendWrapper}>
      <div style={{ top: '50%' }}>
        {services.length > 1 && (
          <IconButton onClick={handleBack} size="small">
            <ChevronLeft />
          </IconButton>
        )}
      </div>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {services.map(item => (
          <ServiceRecommendItem
            key={item._id}
            service={item}
            indexDate={indexDate}
          />
        ))}
      </AutoPlaySwipeableViews>
      <div style={{ top: '50%' }}>
        {services.length > 1 && (
          <IconButton onClick={handleNext} size="small">
            <ChevronRight />
          </IconButton>
        )}
      </div>
    </div>
  );
}
