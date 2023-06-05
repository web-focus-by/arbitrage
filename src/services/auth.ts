import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './query.ts';

export interface IUser {
  fee: number;
  markets_buy: string[];
  markets_sell: string[];
  max_pages: number;
  page: number;
  percent_spread: number;
  profit_spread: number;
  volume_max: number;
  volume_min: number;
  monitoring: 0 | 1;
  risk_type: 0 | 1;
  hedge_type: 0 | 1;
}

export interface IUserResponse {
  user_info: IUser;
  access_token: string;
  refresh_token: string;
}

export type TCredentialsRestore = Omit<IUserResponse, 'user_info'>;

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export const apiAuth = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: IUserResponse) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        return { ...response };
      },
    }),
    refresh: builder.mutation<IUserResponse, void>({
      query: (credentials) => ({
        url: '/refresh',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: IUserResponse) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        return { ...response };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = apiAuth;
