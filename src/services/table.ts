import { createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { getWebSocket, resetWebSocket } from '../utils/webSoket.ts';
import { ITableContent } from '../page/dashboard/components/table/TableDashboard.tsx';
import { restoreCredentials } from '../features/auth/authSlice.ts';
import { isJsonString } from '../utils';
import { baseQueryWithReauth } from '../utils/query.ts';

interface ITableResponse {
  data: ITableContent[];
  page: number;
  last_page: number;
}
interface IWSMessage {
  message: string;
}

const isMessage = (data: ITableContent) => {
  return typeof data === 'object';
  // return !!data;

  // return data && typeof data.id === 'number' && typeof data.channel === 'string';
};
export const apiTable = createApi({
  reducerPath: 'apiTable',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Table'],
  endpoints: (build) => ({
    getSpread: build.query<ITableResponse, number>({
      query: (page) => ({
        url: 'spreads',
        method: 'GET',
        params: {
          page: page ?? 1,
        },
      }),
      providesTags: ['Table'],
    }),
    getMessages: build.query<IWSMessage, void>({
      queryFn: () => {
        return { data: { message: 'empty' } };
      },
      async onCacheEntryAdded(arg, { getState, updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const token = (getState() as RootState).auth.accessToken;

        // create a websocket connection when the cache subscription starts
        const ws = getWebSocket('spreads');

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
            if (!isJsonString(event.data)) {
              return;
            }
            const data = JSON.parse(event.data);
            if ('message' in data) {
              if (data.message === 'spreads') {
                dispatch(apiTable.util?.invalidateTags(['Table']));
              }
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
                  dispatch(apiTable.util.resetApiState());
                }
                return;
              }
            }
            if (!isMessage(data) || data.channel !== arg) return;

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
        resetWebSocket('spreads');
      },
    }),
  }),
});

export const { useGetMessagesQuery, useGetSpreadQuery } = apiTable;
export const selectSpreadData = apiTable.endpoints.getSpread.select(1);
