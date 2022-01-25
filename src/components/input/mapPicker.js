import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import KEY from "../../key/googlemap";
import { LocationOn } from '@material-ui/icons';

export default function MapPicker(props) {

    // const { setPosition } = props;
    const [state, setState] = useState({
        center: {
            lat: 14.5,
            lng: 108
        },
        zoom: 8
    })

    const changePosition = (e) => {
        // setPosition({
        //     lat: e.lat,
        //     lng: e.lng
        // })
        setState({
            zoom: 10,
            center: {
                lat: e.lat,
                lng: e.lng
            }
        })
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: KEY }}
            defaultCenter={{ lat: 14.5, lng: 108 }}
            defaultZoom={8}
            center={state.center}
            zoom={state.zoom}
            onClick={changePosition}
        >
            <LocationOn lat={state.center.lat} lng={state.center.lng} />
        </GoogleMapReact>
    );
}
