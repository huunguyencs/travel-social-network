import * as env from '../key/env';

export const weatherFocast = async (position, callback) => {

    const { lon, lat } = position;

    try {
        if (position) {
            const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${env.WEATHER_API_KEY}&lang=vi&units=metric`);
            const res = await data.json();
            callback(res);
        }
    }
    catch (err) {
        console.log(err);
    }
}