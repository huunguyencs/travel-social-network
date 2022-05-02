import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeftBar from '../../components/Leftbar';
import FeedTour from '../../components/Feed/FeedTour';
// import RightBar from "../../components/Rightbar";
import useStyles from '../../style';
import { homeMenu } from '../../constant/menu';
import SpeedDialButton from '../../components/SpeedDialBtn';
// import Calendar from '../../components/Calendar';
// import FriendRecommendCard from '../../components/Card/FriendRecommend';
import { getTours } from '../../redux/callApi/tourCall';
// import FilterTour from "../../components/Tour/FilterTour";

export default function TourPage(props) {
  const classes = useStyles();
  const { loading, error, tours, id, loadingFirst } = useSelector(
    state => state.tour
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || loadingFirst || error || (tours && id === 0)) return;
    dispatch(getTours());
  }, [dispatch, loading, error, tours, id, loadingFirst]);

  useEffect(() => {
    document.title = 'Hành trình | Triple H';
  }, []);

  // const ref = createRef();

  return (
    <>
      <Grid container className={classes.container}>
        <SpeedDialButton />
        <Grid
          container
          className={classes.containerHome}
          style={{ marginTop: -50 }}
        >
          <Grid item md={3} sm={3} xs={2} className={classes.leftbar}>
            <LeftBar menuList={homeMenu} />
          </Grid>
          <Grid item md={9} sm={9} xs={10} className={classes.content}>
            <FeedTour />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
