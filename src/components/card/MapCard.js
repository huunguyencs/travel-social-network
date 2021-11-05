// import React from "react";
// import GoogleMapReact from 'google-map-react';
// import { Card } from "@material-ui/core";

// import KEY from '../../key/googlemap';
<<<<<<< HEAD
// // import apiIsLoaded from '../../utils/map';
// import { mapCardStyles } from "../../style";

// export default function MapCard(props) {
//     const defaultProps = {
//         center: {
//             lat: 59.95,
//             lng: 30.33
//         },
//         zoom: 11
//     };
=======
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


>>>>>>> d001021226436427791f680465411f374dd49722

//     const classes = mapCardStyles();

<<<<<<< HEAD
//     return (
//         <Card className={classes.container}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: KEY }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//             >
//                 {/* <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                     text="My Marker"
//                 /> */}
//             </GoogleMapReact>
//         </Card>
//     )
// }
=======
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
>>>>>>> d001021226436427791f680465411f374dd49722
