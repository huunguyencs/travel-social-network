import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Tour from '../../components/Tour/TourDetailDemo';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';
import { loadTour } from '../../redux/actions/createTourAction';
// import AddTour from '../../components/Tour/AddTour';
import { sortTourDate } from '../../utils/utils';
import Loading from '../../components/Loading';
import AddTourDemo from '../../components/Tour/AddTourDemo';

export default function TourDetail(props) {
  const location = useLocation();

  const edit = new URLSearchParams(location.search).get('edit');

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const { id } = useParams();
  const [tour, setTour] = useState();
  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });

  const [isOwn, setIsOwn] = useState(false);
  const [joined, setJoined] = useState(false);
  const [joinLoc, setJoinLoc] = useState(false);

  const getTourDetail = async (id, token) => {
    setState({
      loading: true,
      error: false,
      notFound: false
    });
    await customAxios(token)
      .get(`/tour/${id}`)
      .then(res => {
        setTour(sortTourDate(res.data.tour));
        setState({
          loading: false,
          error: false,
          notFound: false
        });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 404)
          setState({
            loading: false,
            error: true,
            notFound: true
          });
        else
          setState({
            loading: false,
            error: true,
            notFound: false
          });
      });
  };

  useEffect(() => {
    getTourDetail(id, auth.token);
  }, [id, auth.token]);

  useEffect(() => {
    if (tour && tour.name) {
      document.title = tour.name;
    }
  }, [tour]);

  useEffect(() => {
    if (auth.user && tour) {
      // setIsOwn(tour.joinIds.includes(auth.user._id));
      setIsOwn(tour.userId._id === auth.user._id);
    }
  }, [tour, auth.user]);

  useEffect(() => {
    if (
      auth.user &&
      tour &&
      tour.joinIds.findIndex(join => join._id === auth.user._id) >= 0
    ) {
      setJoined(true);
    }
  }, [tour, auth.user]);

  useEffect(() => {
    if (auth.user && tour) {
      // let temp = tour.tour.some(item =>
      //     item.locations.some(item => item.joinIds.findIndex(join => join._id === auth.user._id))
      // )
      var sum = 0;
      tour.tour.forEach(date => {
        var sumDate = 0;
        date.locations.forEach(loc => {
          if (loc.joinIds.findIndex(join => join._id === auth.user._id) >= 0)
            sumDate += 1;
        });
        sum += sumDate;
      });
      setJoinLoc(sum);
      console.log(sum);
    }
  }, [tour, auth.user]);

  useEffect(() => {
    if (edit === 'true' && tour) {
      dispatch(loadTour({ tour: tour }));
    }
  }, [edit, tour, dispatch]);

  const tryAgain = () => {
    getTourDetail(id, auth.token);
  };

  return (
    <>
      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <>
            <Typography>Có lỗi xảy ra</Typography>
            <Button onClick={tryAgain}>Thử lại</Button>
          </>
        </div>
      ) : (
        tour &&
        (edit === 'true' && isOwn ? (
          <AddTourDemo isUpdate={true} />
        ) : (
          <Tour
            tour={tour}
            setTour={setTour}
            isOwn={isOwn}
            joined={joined}
            setJoined={setJoined}
            joinLoc={joinLoc}
          />
        ))
      )}
    </>
  );
}
