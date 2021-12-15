import axios from 'axios';

const customAxios = (token = "") => {
    const instance = axios.create({
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        // withCredentials: true,
        timeout: 8 * 1000,
    })
    return instance;
}

export default customAxios;