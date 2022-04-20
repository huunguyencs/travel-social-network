import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid
} from '@material-ui/core';
import Tour from '../Tour';
import Feed from './index';
import { feedStyles } from '../../style';

import { useSelector, useDispatch } from 'react-redux';
import { getMoreTours } from '../../redux/callApi/tourCall';
// import FilterTour from "../Forms/FilterTour";
import { Restore, Favorite } from '@material-ui/icons';
import FilterTour from '../../components/Tour/FilterTour';

export default function FeedTour(props) {
  const dispatch = useDispatch();
  const { tour } = useSelector(state => state);

  const [cost, setCost] = useState([0, 100]);
  const [text, setText] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const classes = feedStyles();
  const loadTour = () => {
    if (tour.hasMore) {
      var maxCost = cost[1],
        minCost = cost[0];
      if (minCost > maxCost) {
        minCost += maxCost;
        maxCost = minCost - maxCost;
        minCost -= maxCost;
      }
      dispatch(
        getMoreTours(tour.page, {
          maxCost: maxCost * 10,
          minCost: minCost * 10,
          q: text
        })
      );
    }
  };

  const tryAgain = () => {
    loadTour(tour.page, dispatch, tour.hasMore);
  };

  const refFilter = React.createRef();

  const FilterTourRef = React.forwardRef((props, ref) => (
    <FilterTour innerRef={ref} {...props} />
  ));
  const [value, setValue] = useState(0);
  return (
    <Grid container className={classes.container}>
      <Grid item md={8} sm={3} xs={2}>
        <div className={classes.content}>
          {/* <div className={classes.createTourContainer}>
                        <Button className={classes.createTour} onClick={handleShow} disabled={!auth.token}>
                            Lên lịch trình ngay!
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={show}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={show}>
                                <CreateTourRef ref={ref} handleClose={handleClose} />
                            </Fade>
                        </Modal>
                    </div> */}
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
                label="Hành trình của bạn"
                icon={<Restore />}
              />
              <BottomNavigationAction
                label="Hành trình nổi bật"
                icon={<Favorite />}
              />
            </BottomNavigation>
          </div>
          <div className={classes.feedContent}>
            <Feed
              loadMore={loadTour}
              tryAgain={tryAgain}
              loading={tour.loading}
              error={tour.error}
              hasMore={tour.hasMore}
            >
              {tour.tours.map(tour => (
                <Tour tour={tour} key={tour._id} />
              ))}
            </Feed>
          </div>
        </div>
      </Grid>
      <Grid item md={4} sm={3} xs={2}>
        <FilterTourRef
          ref={refFilter}
          costParent={cost}
          setCostParent={setCost}
          textParent={text}
          setTextParent={setText}
          isFiltering={isFiltering}
          setIsFiltering={setIsFiltering}
        />
      </Grid>
    </Grid>
  );
}
