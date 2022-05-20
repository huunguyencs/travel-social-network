import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import customAxios from '../utils/fetchData';
import LocationList from '../components/MyReview/LocationList';
import MapReview from '../components/MyReview/MapReview';
import Loading from '../components/Loading';
import useStyles from "../style";


const REVIEWS = [
  {
    _id: 1,
    review: {
      content: 'Chổ này tuyệt đẹp Chổ này tuyệt đẹp Chổ này tuyệt đẹp',
      rate: 4,
      locationId: {
        fullname: 'Quảng Ngãi 1',
        position: {
          lat: 15.5,
          lng: 108
        },
        images: [
          'https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg'
        ]
      },
      images: []
    }
  },
  {
    _id: 2,
    review: {
      rate: 5,
      content: 'Chổ này tuyệt đẹp Chổ này tuyệt đẹp Chổ này tuyệt đẹp',
      images: [
        'https://vtv1.mediacdn.vn/zoom/550_339/2018/11/13/photo-11-15421149127921523173283.jpg'
      ],
      locationId: {
        fullname: 'Quảng Ngãi 2',
        position: {
          lat: 17.5,
          lng: 108
        },
        images: [
          'https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg'
        ]
      }
    }
  },
  {
    _id: 2,
    review: {
      rate: 5,
      content: 'Chổ này tuyệt đẹp Chổ này tuyệt đẹp Chổ này tuyệt đẹp',
      images: [
        'https://vtv1.mediacdn.vn/zoom/550_339/2018/11/13/photo-11-15421149127921523173283.jpg'
      ],
      locationId: {
        fullname: 'Quảng Ngãi 2',
        position: {
          lat: 17.5,
          lng: 108
        },
        images: [
          'https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg'
        ]
      }
    }
  },
  {
    _id: 2,
    review: {
      rate: 5,
      content: 'Chổ này tuyệt đẹp Chổ này tuyệt đẹp Chổ này tuyệt đẹp',
      images: [
        'https://vtv1.mediacdn.vn/zoom/550_339/2018/11/13/photo-11-15421149127921523173283.jpg'
      ],
      locationId: {
        fullname: 'Quảng Ngãi 2',
        position: {
          lat: 17.5,
          lng: 108
        },
        images: [
          'https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg'
        ]
      }
    }
  },
  {
    _id: 2,
    review: {
      rate: 5,
      content: 'Chổ này tuyệt đẹp Chổ này tuyệt đẹp Chổ này tuyệt đẹp',
      images: [
        'https://vtv1.mediacdn.vn/zoom/550_339/2018/11/13/photo-11-15421149127921523173283.jpg'
      ],
      locationId: {
        fullname: 'Quảng Ngãi 2',
        position: {
          lat: 17.5,
          lng: 108
        },
        images: [
          'https://statics.vinpearl.com/canh-dep-viet-nam-15_1634999578.jpg'
        ]
      }
    }
  }
];

export default function MyReviewPage() {
  const { token } = useSelector(state => state.auth);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(null);
  const [center, setCenter] = useState({
    lat: 15,
    lng: 108
  });
  const [zoom, setZoom] = useState(8);
  const classes = useStyles();
  useEffect(() => {
    if (token) {
      // setLoading(true);
      // customAxios(token)
      //   .get('/user/review')
      //   .then(res => {
      //     setReviews(res.data.reviews);
      //     setLoading(false);
      //   })
      //   .catch(err => {
      //     setLoading(false);
      //     setError(true);
      //   });
      setReviews(REVIEWS);
    }
  }, [token]);

  if (loading) return <Loading style={{ marginTop: 150 }} />;

  if (error)
    return (
      <div
        className={classes.center}
      >
        Có lỗi xảy ra
      </div>
    );

  return (
    <div style={{ marginTop: 80, marginInline: 80, alignContent: 'center' }}>
      <Grid container spacing={5}>
        <Grid item md={8} sm={8} xs={12}>
          <MapReview
            reviews={reviews}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            center={center}
            zoom={zoom}
          />
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <LocationList
            reviews={reviews}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            setZoom={setZoom}
            setCenter={setCenter}
          />
        </Grid>
      </Grid>
    </div>
  );
}
