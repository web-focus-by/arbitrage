import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IResetPasswordRequest {
  email: string;
}

interface IChangePasswordCodeRequest {
  code: string;
}
interface IChangePasswordResponse {
  token: string;
}
interface IUpdatePasswordRequest {
  newPassword: string;
  token: string;
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
    checkPasswordCode: builder.mutation<IChangePasswordResponse, string>({
      query: (code) => ({
        url: '/recover',
        method: 'POST',
        body: { code: code },
      }),
    }),
    updatePassword: builder.mutation<IChangePasswordCodeRequest, IUpdatePasswordRequest>({
      query: ({ newPassword, token }) => ({
        url: '/change',
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { new_password: newPassword },
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useCheckPasswordCodeMutation, useUpdatePasswordMutation } = apiResetPassword;
