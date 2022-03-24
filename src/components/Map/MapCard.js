import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Card, CircularProgress, ClickAwayListener, Paper, Popper, Typography } from "@material-ui/core";

import KEY from "../../key/googlemap";
import { Link } from "react-router-dom";
import { cardStyles } from "../../style";
import LocationPinIcon from "../Icons/LocationPin";
import GpsFixedIcon from "../Icons/GpsFixed";

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
            <GpsFixedIcon

                onClick={handlePopoverOpen}
                style={{
                    color: open ? '#3f50b5' : '#ff7961',
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
                        <img src={location.images[0]} alt={"Đang tải..."} height={200} width="100%" title={location.fullname} />
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
                {/* <MapPinIcon className={classes.locationIcon} /> */}
                <LocationPinIcon className={classes.locationIcon} />
                <Typography>{name}</Typography>
            </div>
        </>
    )
}


export default function MapCard(props) {

    const { position, zoom, locations, height, name } = props;
    const [center, setCenter] = useState(position);

    const changeCenter = (position) => {
        setCenter(position)
    }

    useEffect(() => {
        if (position) {
            changeCenter(position);
        }
    }, [position])


    return (
        <Card style={{ height: height ? height : 500 }}>
            {
                position ?
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: KEY }}
                        defaultCenter={{ lat: 14.5, lng: 108 }}
                        defaultZoom={8}
                        center={center}
                        zoom={zoom}
                    // onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                    >
                        {locations && locations.map((item) => (
                            <MapLocation location={item} key={item._id} lat={item.position.lat} lng={item.position.lng} onClick={() => changeCenter(item.position)} />
                        ))}
                        {name && <Position name={name} lat={position.lat} lng={position.lng} />}
                    </GoogleMapReact>
                    : <CircularProgress color='inherit' />
            }

        </Card>
    )
}
