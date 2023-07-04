import { configureStore } from '@reduxjs/toolkit';
import authReducer, { checkToken } from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import { apiAuth } from '../services/auth';
import { apiUserInfo } from '../services/userInfo.ts';
import { apiGeneralInfo } from '../services/generalInfo.ts';
import { apiTable } from '../services/table.ts';
import { apiNotifications } from '../services/notification.ts';
import { apiResetPassword } from '../services/resetPassword.ts';

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiUserInfo.reducerPath]: apiUserInfo.reducer,
    [apiGeneralInfo.reducerPath]: apiGeneralInfo.reducer,
    [apiTable.reducerPath]: apiTable.reducer,
    [apiNotifications.reducerPath]: apiNotifications.reducer,
    [apiResetPassword.reducerPath]: apiResetPassword.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiAuth.middleware)
      .concat(apiUserInfo.middleware)
      .concat(apiGeneralInfo.middleware)
      .concat(apiTable.middleware)
      .concat(apiNotifications.middleware)
      .concat(apiResetPassword.middleware),
});

store.dispatch(checkToken());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infserred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
