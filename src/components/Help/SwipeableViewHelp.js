import {
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { timeAgo } from '../../utils/date';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ItemHelp({ help }) {
  return (
    <Card
      component={Link}
      to={`/help/${help._id}`}
      style={{ backgroundColor: 'white !important' }}
    >
      <CardContent>
        <Typography variant="h6">{help.userId.fullname}</Typography>
        <Typography>
          đang ở gần bạn và gặp sự cố {help.type && `về ${help.type}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          {timeAgo(new Date(help.createdAt))}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SwipeableViewHelp() {
  const { list } = useSelector(state => state.help);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = list.length;

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
    list.length > 0 && (
      <div>
        <Typography variant="h5">Trợ giúp</Typography>
        <div style={{ display: 'flex' }}>
          <div style={{ top: '50%' }}>
            <IconButton onClick={handleBack} size="small">
              <ChevronLeft />
            </IconButton>
          </div>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={5000}
          >
            {list.map(item => (
              <ItemHelp help={item} key={item._id} />
            ))}
          </AutoPlaySwipeableViews>
          <div>
            <IconButton onClick={handleNext} size="small">
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
    )
  );
}
