import { Card, Paper, Popover, Typography } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../Icons/Location';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

const K_WIDTH = 300;
const K_HEIGHT = 250;

const greatePlaceStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2 + 10,
  top: -K_WIDTH + 50
};

function LocationInfo({ review, setShowInfo }) {
  return (
    <Paper style={greatePlaceStyle}>
      <div
        onClick={() => setShowInfo(null)}
        style={{ display: 'flex', justifyContent: 'right', marginRight: 5 }}
      >
        <Typography>x</Typography>
      </div>
      <img
        src={
          review.review?.images?.length
            ? review.review?.images[0]
            : review.review?.locationId.images[0]
        }
        alt={'Đang tải...'}
        width={300}
        height={200}
        title={review.review.locationId.fullname}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          component={Link}
          to={`/posts/${review.review._id}`}
          variant="body2"
        >
          {review.review.content}
        </Typography>
        <Rating
          name="read-only"
          value={review.review.rate}
          readOnly
          size="small"
        />
      </div>
    </Paper>
  );
}

const LocationMarker = ({ location }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <LocationIcon
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      />
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        <Card
          style={{
            width: 200,
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
          }}
        >
          {location?.fullname}
        </Card>
      </Popover>
    </>
  );
};

export default function MapReview({
  reviews,
  center,
  zoom,
  showInfo,
  setShowInfo
}) {
  return (
    <Card style={{ height: '90vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={{ lat: 15, lng: 108 }}
        defaultZoom={8}
        center={center}
        zoom={zoom}
      >
        {reviews.map(item => (
          <LocationMarker
            key={item._id}
            lat={item.review?.locationId?.position.lat}
            lng={item.review?.locationId?.position.lng}
            location={item.review?.locationId}
          />
        ))}
        {showInfo && (
          <LocationInfo
            lat={showInfo.review?.locationId?.position.lat}
            lng={showInfo.review?.locationId?.position.lng}
            review={showInfo}
            setShowInfo={setShowInfo}
          />
        )}
      </GoogleMapReact>
    </Card>
  );
}