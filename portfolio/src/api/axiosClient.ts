
import axios from 'axios';

export const createAxiosClient = (accessToken: string) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://portfolio-be-k3b0.onrender.com/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};
