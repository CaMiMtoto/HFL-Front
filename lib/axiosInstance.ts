// lib/axiosInstance.js
import axios, {AxiosError} from 'axios';

// Create an instance of Axios
const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, // Set the base URL from the environment variable
    headers: {
        'Content-Type': 'application/json', // Set default headers
        'api-token': process.env.NEXT_PUBLIC_API_TOKEN,
    },
});

// Optionally, you can add request/response interceptors here
http.interceptors.request.use(
    (config) => {
        // You can add token or any additional configuration here, for example:
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


interface ApiResponse {
    token: string; // Assuming the API returns a token
    message: string;
    action: number
}

http.interceptors.response.use(
    (response) => {
        if (response.data.action == 0) {
            return Promise.reject(response.data);
        }
        return response;
    },
    (error) => {
        // Handle global errors like 401 (unauthorized) or 500 (server error)
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized! Redirecting to login.');
            // Redirect to login page, or handle refresh token logic
        }
        return Promise.reject(error);
    }
);

export {http, AxiosError}
