import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUserInfo = createApi({
  reducerPath: 'apiUserInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => '/info',
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
