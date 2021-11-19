import React from "react";
import { Room } from "@material-ui/icons";
import GoogleMapReact from 'google-map-react';
import { Card } from "@material-ui/core";

import { renderMarkers } from '../../utils/map';
import { mapCardStyles } from "../../style";
import KEY from "../../key/googlemap";


export default function MapCard(props) {
    const classes = mapCardStyles();
    return (
        <Card className={classes.container}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: KEY }}
                defaultCenter={props.location}
                defaultZoom={15}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
                <Room lat={props.location.lat} lng={props.location.lng} style={{ fontSize: "40px", color: "red" }} />
            </GoogleMapReact>
        </Card>
    )
}
