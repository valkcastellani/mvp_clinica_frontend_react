import axios from 'axios';

const baseURL = "http://localhost:5000";

const httpJSON = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
    }
});

const http = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        Accept: 'multipart/form-data',
    }
});

http.interceptors.request.use((config) => {
    return config;
});

export default http;