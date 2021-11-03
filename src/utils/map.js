// https://stackoverflow.com/questions/53806359/react-how-can-i-draw-a-route-with-google-map-react
// https://stackoverflow.com/questions/55424790/how-i-draw-a-route-with-react-google-maps-component
// https://tomchentw.github.io/react-google-maps/#bicyclinglayer

// import GoogleMapReact from "google-map-react";


const apiIsLoaded = (map, maps) => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = { lat: 40.756795, lng: -73.954298 };
    const destination = { lat: 41.756795, lng: -78.954298 };

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

export default apiIsLoaded;