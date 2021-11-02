import React from "react";
import GoogleMapReact from "google-map-react";
import { Card } from "@material-ui/core";

import KEY from '../../key/googlemap';
import apiIsLoaded from '../../utils/map';

export default function MapCard(props) {

    return (
        <Card>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: KEY
                }}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded()}
            />
        </Card>
    )
}