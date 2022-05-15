import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function LocationItem({ review, onClick }) {
  return (
    <Card onClick={onClick}>
      <CardContent>
        <Typography>{review?.locationId?.fullname}</Typography>
      </CardContent>
    </Card>
  );
}

export default function LocationList({
  reviews,
  setShowInfo,
  setZoom,
  setCenter
}) {
  const handleClick = item => {
    setShowInfo(item);
    setCenter(item.review.locationId?.position);
    setZoom(11);
  };

  return (
    <div style={{ height: '90vh', overflowY: 'auto' }}>
      {!reviews.length && (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Typography>Bạn chưa có review</Typography>
        </div>
      )}
      {reviews.map(item => (
        <div key={item._id} style={{ marginBlock: 10, cursor: 'pointer' }}>
          <LocationItem review={item.review} onClick={e => handleClick(item)} />
        </div>
      ))}
    </div>
  );
}
