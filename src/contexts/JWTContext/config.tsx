import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: "",
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 500) {
            // redirect to error page
        }
        return Promise.reject(
            (error.response && error.response.data) || 'Something went wrong',
        );
    },
);

export default axiosInstance;
