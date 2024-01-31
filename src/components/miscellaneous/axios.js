import axios from 'axios';

// Axios Configuration. Need Credentials to send cookies.
export const axiosWithAuth = axios.create({
    baseURL: 'https://fetsy-ecommerce-backend-2.onrender.com/',
    // baseURL: 'http://localhost:10000/',
    // baseURL: 'http://127.0.0.1:10000/',
    withCredentials: true,
});

export const axiosNoAuth = axios.create({
    baseURL: 'https://fetsy-ecommerce-backend-2.onrender.com/',
    // baseURL: 'http://localhost:10000/',
    // baseURL: 'http://127.0.0.1:10000/',

});