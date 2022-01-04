import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import KEY from "../../key/googlemap";
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { Button, ClickAwayListener, Paper, Popper, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as tourAction from '../../redux/actions/createTourAction';

function Province(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { province, onClick } = props;

    const handlePopoverOpen = (event) => {
        onClick();
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
                        <img src={province.image} alt={"Loading..."} height={200} width="100%" title={province.fullname} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography component={Link} to={`/province/${province.name}`}>{province.fullname.length > 28 ? province.fullname.slice(0, 28) + "..." : province.fullname}</Typography>
                        </div>
                        <Button onClick={onClick}>Chọn</Button>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    )
}

function Location(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);

    const { location, onClick, indexDate } = props;

    const handlePopoverOpen = (event) => {
        onClick();
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    const addLoc = (e) => {
        e.preventDefault();
        dispatch(tourAction.addLocation({ location: location, indexDate: indexDate }))
        handlePopoverClose();
    }

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
                    <Paper style={{ width: 300, height: 300, borderRadius: 10 }}>
                        <img src={location.images[0]} alt={"Loading..."} height={200} width="100%" title={location.fullname} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography component={Link} to={`/location/${location.name}`}>{location.fullname.length > 28 ? location.fullname.slice(0, 28) + "..." : location.fullname}</Typography>
                        </div>
                        <Button onClick={addLoc}>Thêm</Button>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    )
}

export default function AddLocMap(props) {

    const { locations, currentProvince, setLoc, defaultState, setCurrentProvince, provinces, state, setState, indexDate } = props;

    const setProvince = (province) => {
        if (province) {
            setCurrentProvince(province)
            setState({
                zoom: 11,
                center: {
                    lat: province.position.lat,
                    lng: province.position.lon
                }
            })
        }
    }

    return (
        <div style={{ height: 500 }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: KEY }}
                defaultCenter={defaultState.center}
                defaultZoom={defaultState.zoom}
                center={state.center}
                zoom={state.zoom}
            >
                {currentProvince && locations ? locations.map((item) => (
                    <Location location={item} key={item._id} lat={item.position.lat} lng={item.position.lon} onClick={() => {
                        setState({
                            zoom: 12,
                            center: {
                                lat: item.position.lat,
                                lng: item.position.lon
                            }
                        })
                        setLoc(item)

                    }}
                        indexDate={indexDate}
                    />
                ))
                    : provinces && provinces.map((item) => (
                        <Province onClick={() => setProvince(item)} province={item} key={item._id} lat={item.position.lat} lng={item.position.lon} />
                    ))
                }
            </GoogleMapReact>
        </div>
    )
}
