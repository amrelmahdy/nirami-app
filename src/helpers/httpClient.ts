import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

const httpClient: AxiosInstance = axios.create({
  baseURL: Config.SERVER_BASE_URL, // Use server base URL from react-native-config
  // You can add other static config options here
});

// Request interceptor
httpClient.interceptors.request.use(
  config => {
    // Modify request config if needed
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
httpClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default httpClient;

// To use the static httpClient, simply import it and call its methods (get, post, put, patch, delete) as you would with an Axios instance.



