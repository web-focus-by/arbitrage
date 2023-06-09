import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/query.ts';
import { apiUserInfo } from './userInfo.ts';
import { apiTable } from './table.ts';
import { logout } from '../features/auth/authSlice.ts';
import { apiNotifications } from './notification.ts';

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
  email: string;
  name: string;
  telegram: string;
  monitoring: 0 | 1;
  risk_type: 0 | 1;
  hedge_type: 0 | 1;
  subscription_id: number;
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
  tagTypes: ['Auth'],
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
      invalidatesTags: ['Auth'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiTable.util.resetApiState());
          dispatch(apiUserInfo.util.resetApiState());
          dispatch(apiNotifications.util.resetApiState());
        } catch (e) {
          console.log({ e });
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = apiAuth;
