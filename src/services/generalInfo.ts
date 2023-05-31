import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiGeneralInfo = createApi({
  reducerPath: 'apiGeneralInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/general/',
  }),
  tagTypes: ['GeneralInfo'],
  endpoints: (builder) => ({
    getMarketsInfo: builder.query({
      query: () => 'markets',
    }),
    getVideosInfo: builder.query({
      query: () => 'videos',
    }),
  }),
});

export const { useGetMarketsInfoQuery, useGetVideosInfoQuery } = apiGeneralInfo;
