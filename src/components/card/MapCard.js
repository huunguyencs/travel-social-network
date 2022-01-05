import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Card, ClickAwayListener, Paper, Popper, Typography } from "@material-ui/core";
import { GpsFixed, LocationOn } from '@material-ui/icons'

import KEY from "../../key/googlemap";
import { Link } from "react-router-dom";

function MapLocation(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { location } = props;

    const handlePopoverOpen = (event) => {
        props.onClick();
        setAnchorEl(event.currentTarget);
    };

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
                    <Paper style={{ width: 300, height: 240, borderRadius: 10 }}>
                        <img src={location.images[0]} alt={"Loading..."} height={200} width="100%" title={location.fullname} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography component={Link} to={`/location/${location.name}`}>{location.fullname.length > 28 ? location.fullname.slice(0, 28) + "..." : location.fullname}</Typography>
                        </div>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    )
}

function Position(props) {
    const { name } = props;
    return (
        <>
            <div style={{ display: "flex", width: 300 }}>
                <LocationOn style={{ fontSize: 36, color: 'red' }} />
                <Typography style={{ color: 'inherit' }}>{name}</Typography>
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
                    defaultCenter={{
                        lat: position.lat,
                        lng: position.lon
                    }}
                    defaultZoom={zoom}
                    center={center}
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
