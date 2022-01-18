import { Button, Card, CardContent, CardMedia, Drawer, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react'
import { serviceStyles } from '../../style';
import { getStar } from '../../utils/utils';
import { SeeMoreText } from '../seeMoreText';
import ImageList from '../modal/ImageList';

export default function ServiceItem(props) {

    const { service } = props;
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
            return;

        setOpen(open);
    }

    const classes = serviceStyles();

    return (
        <>
            <Card className={classes.container} id={service._id}>
                <CardMedia>
                    <ImageList imageList={service.images} show2Image={true} />
                </CardMedia>
                <div>
                    <CardContent>
                        <Typography variant='h5' className={classes.serviceName}>
                            {service.name}
                        </Typography>
                        <SeeMoreText maxText={50} text={service.description} variant={'body1'} />
                        <div className={classes.rate}>
                            <Rating name="read-only" value={getStar(service.star)} readOnly size="medium" />
                        </div>
                        <Typography className={classes.discount}>{service.discount}</Typography>
                    </CardContent>
                    <div>
                        <Button className={classes.seeReview} onClick={toggleDrawer(true)}>Xem review</Button>
                    </div>
                </div>
            </Card>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div className={classes.reviewContainer}>
                    <div className={classes.centerMarginTop}>
                        <Typography variant='h5'>Review {service.name}</Typography>
                    </div>
                    <div>

                    </div>
                </div>
            </Drawer>
        </>
    )
}
