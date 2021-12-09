import React from "react";
import GoogleMapReact from 'google-map-react';
import { Card } from "@material-ui/core";

import { mapCardStyles } from "../../style";
import KEY from "../../key/googlemap";


export default function MapCard(props) {

    const { position, zoom } = props;

    const classes = mapCardStyles();
    return (
        <Card className={classes.container}>
            {
                position &&
                <GoogleMapReact
                    bootstrapURLKeys={{ key: KEY }}
                    defaultCenter={{
                        lat: position.lat,
                        lng: position.lon
                    }}
                    defaultZoom={zoom}
                // onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                >
                    {/* <Room lat={position.lat} lng={position.lng} style={{ fontSize: "40px", color: "red" }} /> */}
                </GoogleMapReact>
            }

        </Card>
    )
}
