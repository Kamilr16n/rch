'use client';

/*
 * Copyright 2020-present columns.ai
 *
 * The code belongs to https://columns.ai
 * Terms & conditions to be found at `LICENSE.txt`.
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { auth } from '../lib/store';
import {
  HEAD_APP,
  HEAD_DEVICE,
  HEAD_TIER,
  HEAD_WORKSPACE,
  StatusCode,
} from './type';

export type AuthUserInfo = {
  tier: string;
  workspace: string;
};

declare global {
  interface Window {
    user_info: AuthUserInfo;
  }
}

// we will use columns.ai API to power all api needs for rechart
const API_SERVER = 'https://columns.ai/api';

// multiple ways to decide if current client is mobile
// it's for logging purpose not for responsive design
// 1. /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
// 2. typeof screen.orientation !== 'undefined'
// 3. window.innerWidth <= 800 && window.innerHeight <= 600
export const isMobile = (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

// store rechart user info to communicate with API
export const rechartUserInfo = (ui?: AuthUserInfo): AuthUserInfo => {
  if (ui) {
    window.user_info = ui;
  }

  return window.user_info;
};

type AuthHeader = {
  headers: object
};

export const isHandledError = (err: AxiosError): boolean => {
  if (!err.response) {
    return false;
  }

  // check line about 104 for handled status code
  const status = err.response.status;
  return [StatusCode.HTTP_NOT_AUTHENTICATE, StatusCode.HTTP_NOT_ALLOWED].includes(status);
};

const headers = (token: string) => {
  const headers: any = { authorization: token };
  const ui = rechartUserInfo();
  if (ui) {
    headers[HEAD_WORKSPACE] = ui.workspace;
    headers[HEAD_TIER] = ui.tier;
  }

  // indicating if current request is from fina
  headers[HEAD_APP] = 'fina';

  // indicating if current request is from mobile
  headers[HEAD_DEVICE] = isMobile ? 'mobile' : 'desktop';

  return { headers };
};

export const getAuthToken = async (): Promise<string> => {
  return await auth().currentUser?.getIdToken();
};

export const headerByToken = (token: string) => headers(token);

// utility to build request header with idtoken
const getAuthHeader = async (): Promise<AuthHeader> => {
  const authToken = await getAuthToken();
  return headers(authToken);
};

const axiosClient = axios.create({ baseURL: API_SERVER });

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (config.withCredentials) {
    const authHeader = await getAuthHeader();
    config.headers = { ...authHeader.headers, ...config.headers };
    // turn off the default axios withCredentials behavior
    config.withCredentials = false;
  }

  return config;
}, (err: AxiosError) => {
  return Promise.reject(err);
});

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (err: AxiosError) => {
  // remember to add all handled errors to isHandledError.
  if (err.response && err.response.status === StatusCode.HTTP_NOT_AUTHENTICATE) {
    // TODO: set user auth Error and logout
    // store.getActions().user.setAuthError('Session time out, please login again.');
    // store.getActions().user.logout();
  }

  if (err.response && err.response.status === StatusCode.HTTP_NOT_ALLOWED) {
    // TODO: global message alert to display
    // store.getActions().toolbox.setMessage({
    //   text: err.response.data.message + ' Changes will not be saved.',
    //   severity: 'warning',
    // });
  }

  // always reject the error for upper layer to handle additional logic.
  return Promise.reject(err);
});

// API network wrapper, we can handle common HTTP errors here and take appropriate actions
// such as 401/403, we should refreshLogin
export default {
  get: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.get(url, config);
  },
  delete: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.delete(url, config);
  },

  head: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.head(url, config);
  },
  options: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.options(url, config);
  },
  post: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.post(url, data, config);
  },
  put: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.put(url, data, config);
  },
  patch: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
    return axiosClient.patch(url, data, config);
  },
};
