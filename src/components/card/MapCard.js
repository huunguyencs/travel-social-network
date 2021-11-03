import React from "react";
import GoogleMapReact from 'google-map-react';
import { Card } from "@material-ui/core";

// import KEY from '../../key/googlemap';
import { renderMarkers } from '../../utils/map';
import { mapCardStyles } from "../../style";
import { Room } from "@material-ui/icons";

export default function MapCard(props) {
    // const defaultProps = {
    //     center: {
    //         lat: 59.95,
    //         lng: 30.33
    //     },
    //     zoom: 11
    // };



    const classes = mapCardStyles();

    return (
        <Card className={classes.container}>
            <GoogleMapReact
                // bootstrapURLKeys={{ key: KEY }}
                defaultCenter={props.location}
                defaultZoom={15}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
                <Room lat={props.location.lat} lng={props.location.lng} style={{ fontSize: "40px", color: "red" }} />
            </GoogleMapReact>
        </Card>
    )
}