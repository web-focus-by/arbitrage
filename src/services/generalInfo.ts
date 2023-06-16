import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TMarket = {
  market: string;
  name: string;
};

export type TVideo = {
  link: string;
  image: string;
};

export interface IMarketsInfo {
  markets: TMarket[];
}
export interface IVideosInfo {
  videos: TVideo[];
}

export const apiGeneralInfo = createApi({
  reducerPath: 'apiGeneralInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/general/',
  }),
  tagTypes: ['GeneralInfo'],
  endpoints: (builder) => ({
    getMarketsInfo: builder.query<IMarketsInfo, void>({
      query: () => 'markets',
    }),
    getVideosInfo: builder.query<IVideosInfo, void>({
      query: () => 'videos',
    }),
  }),
});

export const { useGetMarketsInfoQuery, useGetVideosInfoQuery } = apiGeneralInfo;
export const selectMarketsResult = apiGeneralInfo.endpoints.getMarketsInfo.select();
export const selectVideosResult = apiGeneralInfo.endpoints.getVideosInfo.select();
