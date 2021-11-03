import React from "react";
import GoogleMapReact from 'google-map-react';
import { Card } from "@material-ui/core";

import KEY from '../../key/googlemap';
// import apiIsLoaded from '../../utils/map';
import { mapCardStyles } from "../../style";

export default function MapCard(props) {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    const classes = mapCardStyles();

    return (
        <Card className={classes.container}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {/* <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </Card>
    )
}