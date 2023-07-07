import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IResetPasswordRequest {
  email: string;
}

interface IChangePasswordCodeRequest {
  code: string;
}
interface IChangePasswordResponse {
  access_token: string;
}
export interface IUpdatePasswordRequest {
  password: string;
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
      transformResponse: (response: IChangePasswordResponse) => {
        localStorage.setItem('resetPasswordToken', response.access_token);
        return { ...response };
      },
    }),
    updatePassword: builder.mutation<IChangePasswordCodeRequest, IUpdatePasswordRequest>({
      query: ({ password, token }) => ({
        url: '/change',
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { password },
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useCheckPasswordCodeMutation, useUpdatePasswordMutation } = apiResetPassword;
