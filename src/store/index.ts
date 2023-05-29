import { configureStore } from '@reduxjs/toolkit';
import authReducer, { checkToken } from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import { apiAuth } from '../services/auth';
import { apiUserInfo } from '../services/userInfo.ts';

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiUserInfo.reducerPath]: apiUserInfo.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware).concat(apiUserInfo.middleware),
});

store.dispatch(checkToken());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infserred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
