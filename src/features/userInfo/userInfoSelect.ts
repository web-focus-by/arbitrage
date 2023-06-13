import { createSelector } from '@reduxjs/toolkit';
import { selectVideosResult } from '../../services/userInfo.ts';

export const selectUserInfo = createSelector(selectVideosResult, (user) => user.data?.user_info ?? null);
export const selectUserInfoIsLoading = createSelector(selectVideosResult, (user) => user.isLoading);
