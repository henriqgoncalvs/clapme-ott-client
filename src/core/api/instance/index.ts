import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
      async (error) => {
        if (error.response?.status === 401) {
          const logout = () => {
            tokenCookies.removeAccess();
            tokenCookies.removeRefresh();
          };

          try {
            const { data } = await authenticatedInstance.get('/refresh-token', {
              headers: {
                Authorization: `Bearer ${tokenCookies.getRefresh()}`,
              },
            });
            if (data) {
              tokenCookies.setAccess(data.token);
              authenticatedInstance.defaults.headers.common.Authorization = `Bearer ${tokenCookies.getAccess}`;

              try {
                const newConfig = { ...error.response.config };
                newConfig.headers.Authorization = data.token;
                const newResponse = authenticatedInstance(newConfig);
                return newResponse;
              } catch (err) {
                logout();
                return null;
              }
            } else {
              logout();
              return null;
            }
          } catch (err) {
            logout();
            return null;
          }
        }

        return error.response;
      },
    );

    return authenticatedInstance;
  },
};
