import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { serviceStyles } from '../../style';
import Loading from '../Loading';

import ServiceItem from './ServiceItem';

export default function ServiceList() {
  const { service } = useSelector(state => state);

  const classes = serviceStyles();

  return (
    <div>
      <div className={classes.titleService}>
        <Typography variant="h4">Danh sách dịch vụ</Typography>
      </div>
      <div className={classes.listContainer}>
        {service.services.map(item => (
          <ServiceItem key={item._id} service={item} />
        ))}
        {service.loading && (
          <div className={classes.centerMarginTop}>
            <Loading />
          </div>
        )}
        {service.error && (
          <div className={classes.centerMarginTop}>Có lỗi xảy ra</div>
        )}
      </div>
    </div>
  );
}
