import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography
} from '@material-ui/core';
import * as tourAction from '../../redux/actions/createTourAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function ServiceRecommendItem({ service, indexDate }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const addToDate = () => {
    dispatch(
      tourAction.addServiceDate({
        service,
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
        <Typography gutterBottom variant="h5" component="h2">
          {service?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {service?.andress}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {service?.cost}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={addToDate}>
          Thêm dịch vụ
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ServiceRecommend({ services, indexDate }) {
  return (
    <div>
      {services.map(item => (
        <ServiceRecommendItem
          key={item._id}
          service={item}
          indexDate={indexDate}
        />
      ))}
    </div>
  );
}
