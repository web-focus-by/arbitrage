import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface IUser {
  first_name: string;
  last_name: string;
}

export interface IUserResponse {
  user: IUser;
  access_token: string;
  refresh_token: string;
}

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
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: IUserResponse) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
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
        localStorage.setItem('user', JSON.stringify(response.user));
        return { ...response };
      },
    }),

    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation, useSignupMutation } = apiAuth;
