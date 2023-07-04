import { createSelector } from '@reduxjs/toolkit';
import { selectUserInfoData } from '../../services/userInfo.ts';
import { selectSpreadData } from '../../services/table.ts';

export const selectUserInfo = createSelector(selectUserInfoData, (user) => user.data?.user_info ?? null);
export const selectUserInfoIsLoading = createSelector(selectUserInfoData, (user) => user.isLoading);

export const selectTableInfo = createSelector(selectSpreadData, (request) => request.isLoading);
