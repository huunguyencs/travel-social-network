import { Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { serviceStyles } from '../../style';

import ServiceItem from './ServiceItem';

export default function ServiceList() {

    const { services } = useSelector(state => state.user);

    const classes = serviceStyles();

    return (
        <div>
            <div className={classes.centerMarginTop}>
                <Typography variant='h4'>Danh sách dịch vụ</Typography>
            </div>
            <div className={classes.listContainer}>
                {services.map((item) => (
                    <ServiceItem key={item._id} service={item} />
                ))}
            </div>
        </div>
    )
}
