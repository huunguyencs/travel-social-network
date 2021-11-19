import axios from 'axios';

const client = (token) => {
    const defaultOptions = {
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
    }

    return {
        get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        patch: (url, data, options = {}) => axios.patch(url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options })
    }
}

const request = client("token");

export default request;
export { client };