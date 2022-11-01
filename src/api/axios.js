import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

 
axiosInstance.interceptors.request.use(async (config) => {
    const value = await localStorage.getItem('token');
    if (value) {
      config.headers = {
        Authorization: `Bearer ${value}`,
      };
    }

    return config;
  });

export default axiosInstance