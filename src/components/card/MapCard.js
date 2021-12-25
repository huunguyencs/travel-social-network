import React from "react";
import GoogleMapReact from 'google-map-react';
import { Card, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

import { mapCardStyles } from "../../style";
import KEY from "../../key/googlemap";


export default function MapCard(props) {

    const { position, name, zoom } = props;

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
                    <div lat={position.lat} lng={position.lon} style={{ width: "150px", display: "flex" }}>
                        <LocationOn style={{ fontSize: "40px", color: "red", margin: "auto" }} />
                        {name && <Typography style={{ width: "100%", margin: "auto" }}>{name}</Typography>}
                    </div>
                </GoogleMapReact>
            }

        </Card>
    )
}
