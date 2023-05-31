import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const apiUserInfo = createApi({
  reducerPath: 'apiUserInfo',
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
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: '/info',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['UserInfo'],
    }),
    updateUserInfo: builder.mutation({
      query: (credentials) => ({
        url: '/info',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = apiUserInfo;
