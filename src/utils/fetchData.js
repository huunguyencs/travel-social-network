import axios from 'axios';
// import { useSelector } from 'react-redux';

// const client = (token) => {
//     const defaultOptions = {
//         baseURL: "http://localhost:5000",
//         headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "application/json",
//         },
//     }

//     return {
//         get: (url, token, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
//         post: (url, token, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
//         put: (url, token, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
//         patch: (url, token, data, options = {}) => axios.patch(url, data, { ...defaultOptions, ...options }),
//         delete: (url, token, options = {}) => axios.delete(url, { ...defaultOptions, ...options })
//     }
// }

// // const request = client("token");

// export default client;
// export { client };

// const instance = axios.create({
//     baseURL: "https://localhost:5000",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     timeout: 10 * 1000,
// })

const customAxios = (token = "") => {
    const instance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        timeout: 10 * 1000
    })
    return instance;
}

export default customAxios;