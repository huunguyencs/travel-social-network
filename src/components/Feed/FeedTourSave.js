import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid
} from '@material-ui/core';
import Tour from '../Tour';
import Feed from './index';
import { feedStyles } from '../../style';

import { useSelector } from 'react-redux';
// import { getMoreTours } from '../../redux/callApi/tourCall';
import { Bookmark } from '@material-ui/icons';
import Loading from '../Loading';
// import FilterTour from '../../components/Tour/FilterTour';

export default function FeedTourSave(props) {
  const { tour } = useSelector(state => state);

  const classes = feedStyles();

  const [value, setValue] = useState(0);
  return (
    <Grid container className={classes.container}>
      <Grid item md={8} sm={12} xs={12}>
        <div className={classes.content}>
          <div className={classes.contentSubNav}>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
              className={classes.contentSubNavList}
            >
              <BottomNavigationAction
                label="Hành trình đã lưu"
                icon={<Bookmark />}
              />
            </BottomNavigation>
          </div>
          <div className={classes.feedContent}>
            {tour.loadingFirst ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 150
                }}
              >
                <Loading />
              </div>
            ) : (
              <Feed
                // loadMore={loadTour}
                // tryAgain={tryAgain}
                loading={tour.loading}
                error={tour.error}
                hasMore={tour.hasMore}
              >
                {tour.tours &&
                  tour.tours.map(tour => <Tour tour={tour} key={tour._id} />)}
              </Feed>
            )}
          </div>
        </div>
      </Grid>
      <Grid item md={4} className={classes.filterTour}></Grid>
    </Grid>
  );
}
