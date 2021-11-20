import axios from 'axios';

const customAxios = (token = "") => {
    const instance = axios.create({
        // baseURL: "http://localhost:5000",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        // withCredentials: true,
        timeout: 10 * 1000,
    })
    return instance;
}

export default customAxios;