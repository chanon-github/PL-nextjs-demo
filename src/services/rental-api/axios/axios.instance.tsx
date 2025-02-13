/**
 *  Axios - Instance
 */

import { default as Axios, AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { loginApi } from '@/services/central-api';
export const BASE_URL = `${process.env.NEXT_PUBLIC_RENTAL_API_URL}`;
import { notify } from '@/utils/functions/notification';
import { Cookies } from 'react-cookie';
// const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  //timeout: 1000
});
let authTokenRequest: any;
const cookies = new Cookies();
const setTokens = (accessToken: string, refreshToken: string) => {
  
  cookies.set('accessToken', accessToken, { path: '/', maxAge: 86400 }); // 1 day
  cookies.set('refreshToken', refreshToken, { path: '/', maxAge: 604800 }); // 7 days
};
const getTokens = () => ({
  accessToken: cookies.get('accessToken'),
  refreshToken: cookies.get('refreshToken'),
});

const onBeforeRequest: any = async (config: InternalAxiosRequestConfig) => {
  // console.log(`onBeforeRequest`, config.url)
  // if (typeof window === undefined) {
  //   return;
  // }
  // const { accessToken } = getTokens();

  // if (accessToken) {
  //   console.log(`accessToken`, accessToken);
  //   config.headers['Authorization'] = `Bearer ${accessToken}`;
  // }
  return config;
};

const onRequestError = (err: any) => {
  console.error('onRequestError', err);
};

const onBeforeResponse: any = async (config: AxiosResponse) => {
  //console.log(`onBeforeResponse`, config)
  return config;
};

const onResponseError = async (err: any) => {
  const originalRequest = err.config;
  const { refreshToken } = getTokens();

  if (err.response?.status === 401 && refreshToken && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const response = await loginApi.apiLoginRefreshRefreshTokenPost({refreshToken: refreshToken});
      if (response.status === 200) {
        // const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        const accessToken = response.data.data?.accessToken;
        const newRefreshToken = response.data.data?.refreshToken;
        if(accessToken && newRefreshToken){
          setTokens(accessToken, newRefreshToken);
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
        return
      }
    } catch (refreshError) {
      notify({ title: 'Error', type: 'error' });
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
    }
  }

  return Promise.reject(err?.response?.data);
};



axiosInstance.interceptors.request.use(onBeforeRequest, onRequestError);
axiosInstance.interceptors.response.use(onBeforeResponse, onResponseError);
