import React from 'react';
import loadingGif from './loading.gif';

export default function Loading(props) {
  return <img src={loadingGif} alt="loading..." {...props} width={100} />;
}
