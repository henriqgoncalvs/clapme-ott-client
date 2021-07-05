import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { TokenCookies } from 'core/api/Cookies';
import { API_URL } from 'core/config';

const config: Partial<AxiosRequestConfig> = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const tokenCookies = new TokenCookies();

const unathenticatedInstance: AxiosInstance = axios.create(config);
const authenticatedInstance: AxiosInstance = axios.create(config);

export default {
  unauthorized() {
    unathenticatedInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );

    return unathenticatedInstance;
  },

  authorized(token?: string) {
    authenticatedInstance.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : `Bearer ${tokenCookies.getAccess()}`;
    authenticatedInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => error.response,
    );

    return authenticatedInstance;
  },
};
