import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosServer } from './axios';
import { RootState } from '@/redux/store';
import { unsetAuth } from '@/redux/slices/authSlice';

interface AxiosErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async (
    { url, method = 'GET', data, params, headers },
    { getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const result = await axiosServer({
        url: baseUrl + url,
        method,
        data,

        params,
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<AxiosErrorResponse>;

      if (err.response?.status === 401) {
        dispatch(unsetAuth());
      }

      return {
        error: {
          status: err.response?.status,
          data: {
            message: err.response?.data?.message || err.message,
          },
        },
      };
    }
  };
