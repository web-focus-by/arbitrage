import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWs } from '../utils/query.ts';
import { RootState } from '../store';
import { getWebSocket } from '../utils/webSoket.ts';

export type Channel = 'redux' | 'general';

export interface Message {
  id: number;
  channel: Channel;
  userName: string;
  text: string;
  glossary: object;
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
const isMessage = (data: Message) => {
  return typeof data === 'object';
  // return !!data;

  // return data && typeof data.id === 'number' && typeof data.channel === 'string';
};
export const apiTable = createApi({
  reducerPath: 'apiTable',
  baseQuery: baseQueryWs,
  tagTypes: ['Table'],
  endpoints: (build) => ({
    getMessages: build.query<Message[], void>({
      queryFn: () => {
        return { data: [] };
      },
      async onCacheEntryAdded(arg, { getState, updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const token = (getState() as RootState).auth.accessToken;

        console.log({ state: getState() });

        // create a websocket connection when the cache subscription starts
        const ws = getWebSocket();

        ws.addEventListener('open', () => {
          ws.send(JSON.stringify({ access_token: token }));
        });

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message

          const listener = (event: MessageEvent) => {
            if (!isJsonString(event.data)) {
              return;
            }
            const data = JSON.parse(event.data);
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
        ws.close();
      },
    }),
  }),
});

export const { useGetMessagesQuery } = apiTable;
