import { selectMarketsResult, selectVideosResult } from '../../services/generalInfo.ts';
import { createSelector } from '@reduxjs/toolkit';
import { SHOP_ARR } from '../../constants';

export const selectAllMarkets = createSelector(
  selectMarketsResult,
  (marketsResult) => marketsResult.data?.markets ?? SHOP_ARR,
);
export const selectAllVideos = createSelector(
  selectVideosResult,
  (videoResult) => videoResult.data?.videos ?? SHOP_ARR,
);
