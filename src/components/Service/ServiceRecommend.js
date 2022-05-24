import React,{useState} from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import * as tourAction from '../../redux/actions/createTourAction';
import { useDispatch } from 'react-redux';
import { tourdetailStyles } from '../../style';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ServiceRecommendItem({ service, indexDate }) {
  const classes = tourdetailStyles();
  const dispatch = useDispatch();

  const addToDate = () => {
    // console.log(service);
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

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={service?.images[0]}
        title={service?.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" >
          {service?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {service?.andress}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {service?.cost}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonWrapper}>
        <Button size="small" onClick={addToDate} className={classes.reviewBtn}>
          Thêm dịch vụ
        </Button>
      </CardActions>
    </Card>
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
          {services.length > 1 &&
            <IconButton onClick={handleBack} size="small">
              <ChevronLeft />
            </IconButton>
          }
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
          {services.length > 1 &&
            <IconButton onClick={handleNext} size="small">
              <ChevronRight />
            </IconButton>
          }
    </div>
  );
}
