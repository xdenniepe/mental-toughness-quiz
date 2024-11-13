import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: window.API_BASE_PATH,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = getLocalStorageItem('token');

    // if (token) {
    //   config.headers.Authorization = BEARER + token;
    // }

    console.info('config : ', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('error : ', error.response);

    return Promise.reject(error);
  }
);

export default axiosInstance;
