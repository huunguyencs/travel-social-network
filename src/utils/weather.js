import * as env from '../key/env';

export const weatherFocast = async (location, callback) => {
    try {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${env.WEATHER_API_KEY}&lang=vi`);
        const res = await data.json();
        console.log(res);
        callback(res);
    }
    catch (err) {
        console.log(err);
    }
}