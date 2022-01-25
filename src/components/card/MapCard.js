import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Card, ClickAwayListener, Paper, Popper, Typography } from "@material-ui/core";
import { GpsFixed, LocationOn } from '@material-ui/icons'

import KEY from "../../key/googlemap";
import { Link } from "react-router-dom";
import { cardStyles } from "../../style";

function MapLocation(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { location } = props;

    const handlePopoverOpen = (event) => {
        props.onClick();
        setAnchorEl(event.currentTarget);
    };

    const classes = cardStyles();

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <GpsFixed

                onClick={handlePopoverOpen}
                style={{
                    color: open ? 'blue' : 'red',
                    cursor: 'pointer',
                }}
            />
            <Popper
                id="province popover"
                open={open}
                anchorEl={anchorEl}
                placement="top"
                disablePortal={false}
                transition
                onClose={handlePopoverClose}
            >
                <ClickAwayListener onClickAway={handlePopoverClose}>
                    <Paper className={classes.locationPopper}>
                        <img src={location.images[0]} alt={"Loading..."} height={200} width="100%" title={location.fullname} />
                        <div className={classes.center}>
                            <Typography title={location.fullname} component={Link} to={`/location/${location.name}`}>{location.fullname.length > 28 ? location.fullname.slice(0, 28) + "..." : location.fullname}</Typography>
                        </div>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    )
}

function Position(props) {
    const { name } = props;

    const classes = cardStyles();

    return (
        <>
            <div className={classes.positionContainer}>
                <LocationOn className={classes.locationIcon} />
                <Typography>{name}</Typography>
            </div>
        </>
    )
}


export default function MapCard(props) {

    const { position, zoom, locations, height, name } = props;
    const [center, setCenter] = useState({
        lat: position.lat,
        lng: position.lon
    });

    const changeCenter = (position) => {
        setCenter({
            lat: position.lat,
            lng: position.lon
        })
    }


    return (
        <Card style={{ height: height ? height : 500 }}>
            {
                position &&
                <GoogleMapReact
                    bootstrapURLKeys={{ key: KEY }}
                    defaultCenter={{ lat: 14.5, lng: 108 }}
                    defaultZoom={8}
                    center={center}
                    zoom={zoom}
                // onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                >
                    {locations && locations.map((item) => (
                        <MapLocation location={item} key={item._id} lat={item.position.lat} lng={item.position.lon} onClick={() => changeCenter(item.position)} />
                    ))}
                    {name && <Position name={name} lat={position.lat} lng={position.lon} />}
                </GoogleMapReact>
            }

        </Card>
    )
}
