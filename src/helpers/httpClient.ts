import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpClient: AxiosInstance = axios.create({
  baseURL: Config.SERVER_BASE_URL, // Use server base URL from react-native-config
  // You can add other static config options here
});


const attachToken = async (config)  => {
  try {
    const accessToken = await AsyncStorage.getItem('access-token');
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (e) {
  }
  return config;
}

httpClient.interceptors.request.use(
  (config) => Promise.resolve(attachToken(config)),
  error => Promise.reject(error)
);


// Response interceptor
httpClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default httpClient;

// To use the static httpClient, simply import it and call its methods (get, post, put, patch, delete) as you would with an Axios instance.



