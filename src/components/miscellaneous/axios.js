import axios from 'axios';

export const axiosWithAuth = axios.create({
    baseURL: 'https://api.fetsyshoponline.com/',
    // baseURL: 'http://localhost:10000/',
    withCredentials: true,
});

export const axiosNoAuth = axios.create({
    baseURL: 'https://api.fetsyshoponline.com/',
    // baseURL: 'http://localhost:10000/',
});