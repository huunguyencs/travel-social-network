import { Button, Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { feedStyles } from '../../style';
import Event from '../Event';
import Location from '../Location';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, getHotLocation } from '../../redux/callApi/hotCall';

export default function FeedHot(props) {
  const classes = feedStyles();
  const { events, locations } = useSelector(state => state.hot);
  const dispatch = useDispatch();

  const [stateEvent, setStateEvent] = useState({
    loading: false,
    error: false
  });

  const [stateLocation, setStateLocation] = useState({
    loading: false,
    error: false
  });

  const getCurrentEvent = dispatch => {
    setStateEvent({
      loading: true,
      error: false
    });
    dispatch(
      getEvent(
        () =>
          setStateEvent({
            loading: false,
            error: false
          }),
        () =>
          setStateEvent({
            loading: false,
            error: true
          })
      )
    );
  };

  const getHotLocations = dispatch => {
    setStateLocation({
      loading: true,
      error: false
    });
    dispatch(
      getHotLocation(
        () =>
          setStateLocation({
            loading: false,
            error: false
          }),
        () =>
          setStateLocation({
            loading: false,
            error: true
          })
      )
    );
  };

  useEffect(() => {
    if (stateLocation.loading || stateLocation.error || locations) return;
    getHotLocations(dispatch);
  }, [dispatch, stateLocation, locations]);

  useEffect(() => {
    if (stateEvent.loading || stateEvent.error || events) return;
    getCurrentEvent(dispatch);
  }, [dispatch, stateEvent, events]);

  return (
    <Container className={classes.container}>
      <div className={classes.content}>
        <div className={classes.event}>
          <div className={classes.title}>
            <Typography variant="h4">Sự kiện</Typography>
          </div>
          {stateEvent.loading ? (
            <div className={classes.centerMarginTop}>
              <Loading />
            </div>
          ) : stateEvent.error ? (
            <div className={classes.centerMarginTop}>
              <Button onClick={getCurrentEvent}>Thử lại</Button>
            </div>
          ) : (
            events && <Event events={events} />
          )}
        </div>
        <div className={classes.hot}>
          <div className={classes.title}>
            <Typography variant="h4">Địa điểm hot</Typography>
          </div>
          <div className={classes.hotFeed}>
            {stateLocation.loading ? (
              <div className={classes.centerMarginTop}>
                <Loading />
              </div>
            ) : stateLocation.error ? (
              <div className={classes.centerMarginTop}>
                <Button onClick={getHotLocations}>Thử lại</Button>
              </div>
            ) : (
              locations &&
              locations.map(item => <Location location={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
