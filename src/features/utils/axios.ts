import axios from 'axios';
import { BACKEND_URL_GRAPHQL } from './constants';

const axiosInstance = axios
    .create({
        baseURL: BACKEND_URL_GRAPHQL,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    ;

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;