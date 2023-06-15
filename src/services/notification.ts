import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils/query.ts';

interface INotification {
  id: number;
  title: string;
  content: string;
  creation_date: string;
  if_read: boolean;
}

export const apiNotifications = createApi({
  reducerPath: 'apiNotifications',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Notifications'],
  endpoints: (build) => ({
    getNotifications: build.query<INotification[], void>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsQuery } = apiNotifications;
