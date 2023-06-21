import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils/query.ts';
import { RootState } from '../store';
import { getWebSocket, resetWebSocket } from '../utils/webSoket.ts';
import { restoreCredentials } from '../features/auth/authSlice.ts';
import { isJsonString } from '../utils';
import { showNotification } from '../utils/notification.ts';
import { getFormattedSpreadString } from '../components/header/notification/notification.ts';
import { ITableContent } from '../page/dashboard/components/table/TableDashboard.tsx';

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
    notificationStream: build.query<INotification[], void>({
      queryFn: () => {
        return { data: [] };
      },
      async onCacheEntryAdded(_, { getState, updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const token = (getState() as RootState).auth.accessToken;

        // create a websocket connection when the cache subscription starts
        const ws = getWebSocket('notifications');

        ws.addEventListener('open', () => {
          ws.send(JSON.stringify({ access_token: token }));
        });

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message

          const listener = async (event: MessageEvent) => {
            console.log({ state: getState() });

            console.log({ event });
            if (!isJsonString(event.data)) {
              return;
            }
            const data = JSON.parse(event.data);
            if ('message' in data) {
              if (data.message === 'Authorization invalid') {
                try {
                  const response = await fetch('api/refresh', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh_token: (getState() as RootState).auth.refreshToken }),
                  });
                  const newToken = await response.json();

                  if (!newToken.access_token) {
                    throw new Error('No access token');
                  }
                  dispatch(restoreCredentials({ ...newToken }));

                  ws.send(JSON.stringify({ access_token: (getState() as RootState).auth.accessToken }));
                } catch (e) {
                  console.log({ e });
                  dispatch(apiNotifications.util.resetApiState());
                }
                return;
              }
            }

            dispatch(apiNotifications.util.invalidateTags(['Notifications']));
            data.forEach((notification: INotification) => {
              if (notification.ntype === 'spread') {
                const contentData = JSON.parse(notification.content) as ITableContent;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const markets = getState().apiGeneralInfo.queries['getMarketsInfo(undefined)']?.data.markets;
                const content = getFormattedSpreadString(contentData as ITableContent, markets);
                showNotification({
                  title: notification.title,
                  body: content,
                  icon: contentData.icon,
                });
              } else if (notification.ntype === 'text') {
                showNotification({
                  title: notification.title,
                  body:
                    notification.content.length > 40 ? notification.content.slice(0, 40) + '...' : notification.content,
                });
              }
            });
            updateCachedData(() => {
              return data;
            });
          };

          ws.addEventListener('message', listener);
        } catch (e) {
          console.log({ e });
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active

        // await cacheEntryRemoved;
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        resetWebSocket('notifications');
      },
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation, useNotificationStreamQuery } = apiNotifications;
