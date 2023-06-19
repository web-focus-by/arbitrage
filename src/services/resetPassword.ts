import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IResetPasswordRequest {
  email: string;
}
interface IChechPasswordCodeRequest {
  code: string;
}
export const apiResetPassword = createApi({
  reducerPath: 'apiResetPassword',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/password',
  }),
  tagTypes: ['ResetPassword'],
  endpoints: (builder) => ({
    resetPassword: builder.mutation<IResetPasswordRequest, string>({
      query: (email) => ({
        url: '/recover',
        method: 'GET',
        params: {
          email: email,
        },
      }),
    }),
    checkPasswordCode: builder.mutation<IChechPasswordCodeRequest, string>({
      query: (code) => ({
        url: '/recover',
        method: 'POST',
        body: { code: code },
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useCheckPasswordCodeMutation } = apiResetPassword;
