import { axiosBaseQuery } from '@/api/interceptor/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: null;
}
export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string
}

export interface IRegisterResponse {
  user: IUser;
  token: string;
}

export const authApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:4000`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: `/auth/login`,
        method: 'POST',
        data: credentials,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (newUser) => ({
        url: `/auth/register`,
        method: 'POST',
        data: newUser,
      }),
    }),
  }),
  tagTypes: [],
});

export const { useLoginMutation, useRegisterMutation } = authApi;
