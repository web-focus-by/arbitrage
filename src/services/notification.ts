import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils/query.ts';

export interface INotification {
  id: number;
  title: string;
  content: string;
  creation_date: string;
  if_read: boolean;
  ntype: 'spread' | 'text';
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
    readNotification: build.mutation<INotification, number>({
      query: (id) => ({
        url: `/notifications`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } = apiNotifications;
