import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils/query.ts';
import { IUser } from './auth.ts';

interface IUserResponse {
  user_info: IUser;
}
export const apiUserInfo = createApi({
  reducerPath: 'apiUserInfo',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['UserInfo'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserResponse, void>({
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
export const selectVideosResult = apiUserInfo.endpoints.getUserInfo.select();
