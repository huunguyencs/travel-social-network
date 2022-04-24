import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FeedTourSave from '../components/Feed/FeedTourSave';
import SpeedDialButton from '../components/SpeedDialBtn';
import { getTourSaved } from '../redux/callApi/tourCall';

const useStyle = makeStyles(theme => ({
  container: {
    marginInline: 100,
    [theme.breakpoints.down('md')]: {
      marginInline: 60
    },
    [theme.breakpoints.down('sm')]: {
      marginInline: 20
    },
    [theme.breakpoints.down('xs')]: {
      marginInline: 0
    }
  }
}));

export default function TourSavedPage() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { auth, tour } = useSelector(state => state);

  useEffect(() => {
    if (
      !auth.token ||
      tour.loading ||
      tour.error ||
      tour.loadingFirst ||
      (tour.tours && tour.id === -1)
    )
      return;
    dispatch(getTourSaved(auth.token));
  }, [dispatch, auth.token, tour]);

  useEffect(() => {
    document.title = 'Đã lưu';
  }, []);

  return (
    <>
      {auth.token && (
        <>
          <SpeedDialButton />
          <Container>
            <div className={classes.container}>
              <FeedTourSave />
            </div>
          </Container>
        </>
      )}
    </>
  );
}
