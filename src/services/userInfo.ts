import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './query.ts';

export const apiUserInfo = createApi({
  reducerPath: 'apiUserInfo',
  baseQuery: baseQueryWithReauth,
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
