import { createSelector } from '@reduxjs/toolkit';
import { selectUserInfoData } from '../../services/userInfo.ts';

export const selectUserInfo = createSelector(selectUserInfoData, (user) => user.data?.user_info ?? null);
export const selectUserInfoIsLoading = createSelector(selectUserInfoData, (user) => user.isLoading);
