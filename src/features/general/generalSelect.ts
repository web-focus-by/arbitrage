import { selectMarketsResult, selectSubscriptionsResult, selectVideosResult } from '../../services/generalInfo.ts';
import { createSelector } from '@reduxjs/toolkit';
import { SHOP_ARR, VIDEO_ARR } from '../../constants';

export const selectAllMarkets = createSelector(
  selectMarketsResult,
  (marketsResult) => marketsResult.data?.markets ?? SHOP_ARR,
);
export const selectAllVideos = createSelector(
  selectVideosResult,
  (videoResult) => videoResult.data?.videos ?? VIDEO_ARR,
);
export const selectAllSubscriptions = createSelector(
  selectSubscriptionsResult,
  (subscriptionsResult) => subscriptionsResult.data?.subscriptions ?? SHOP_ARR,
);
