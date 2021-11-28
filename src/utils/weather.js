import * as env from '../key/env';

export const weatherFocast = async (location, callback) => {
    try {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${env.WEATHER_API_KEY}&lang=vi`);
        const res = await data.json();
        // const res = { "coord": { "lon": 105.8412, "lat": 21.0245 }, "weather": [{ "id": 803, "main": "Clouds", "description": "mây cụm", "icon": "04d" }], "base": "stations", "main": { "temp": 294.15, "feels_like": 293.64, "temp_min": 294.15, "temp_max": 294.15, "pressure": 1016, "humidity": 51, "sea_level": 1016, "grnd_level": 1015 }, "visibility": 10000, "wind": { "speed": 3.15, "deg": 349, "gust": 3.49 }, "clouds": { "all": 56 }, "dt": 1637208427, "sys": { "type": 1, "id": 9308, "country": "VN", "sunrise": 1637190533, "sunset": 1637230496 }, "timezone": 25200, "id": 1581130, "name": "Hà Nội", "cod": 200 }
        callback(res);
    }
    catch (err) {
        console.log(err);
    }
}