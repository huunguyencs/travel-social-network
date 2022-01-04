import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { Card, ClickAwayListener, Paper, Popper, Typography } from "@material-ui/core";

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
            <FiberManualRecordTwoToneIcon

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


export default function MapCard(props) {

    const { position, zoom, locations, height } = props;
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
                </GoogleMapReact>
            }

        </Card>
    )
}
