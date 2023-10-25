import axios from 'axios';

// Axios Configuration. Need Credentials to send cookies.
export const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
});

export const axiosNoAuth = axios.create({
    baseURL: 'http://localhost:5000/',
});