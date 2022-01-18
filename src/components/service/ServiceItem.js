import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Drawer, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { serviceStyles } from '../../style';

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
            <Card>
                <CardMedia
                    image={service.images[0]}
                    title={service.name}
                />
                <CardContent>
                    <Typography>
                        {service.name}
                    </Typography>
                    <Typography>
                        {service.description}
                    </Typography>
                    <div className={classes.star}>
                        <Typography noWrap={false}>{getStar(service.star)}</Typography>
                        <Star className={classes.starIcon} />
                    </div>
                    <Typography>{service.discount}</Typography>
                </CardContent>
                <CardActionArea>
                    <CardActions>
                        <Button onClick={toggleDrawer(true)}>Xem review</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div>

                </div>
            </Drawer>
        </>
    )
}
