import axios from 'axios';

const baseURL = "http://127.0.0.1:5000";

const http = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
    }
});

http.interceptors.request.use((config) => {
    return config;
});

export default http;