import axios from 'axios';
import {API_URL} from 'react-native-dotenv';
import {useUserStorage} from '@hooks/useUserStorage';

const api = axios.create({baseURL: API_URL});

api.interceptors.request.use(
  async config => {
    const userStorage = useUserStorage();

    const user = await userStorage.read('user');

    if (user?.authorization) {
      config.headers!.Authorization = `Bearer ${user?.authorization}`;
    }

    return config;
  },

  error => Promise.reject(error),
);

export default api;
