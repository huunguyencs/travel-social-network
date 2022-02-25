import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import GoogleMapPicker from 'react-google-map-picker'
// import KEY from "../../key/googlemap";

const DefaultLocation = { lat: 18, lng: 106 };
const DefaultZoom = 8;

export default function MapPicker(props) {

    const { position, setPosition } = props;

    const defaultLocation = position || DefaultLocation;

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        // setPosition({ lat: lat, lng: lng })
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setPosition({ ...location })
    }

    return (
        <>
            <GoogleMapPicker
                defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{ height: 450 }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey={'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'}
            />
            <Button onClick={handleSubmit}>Xác nhận vị trí</Button>
        </>
    )
}
