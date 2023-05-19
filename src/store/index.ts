import { configureStore } from '@reduxjs/toolkit';
import authReducer, { checkToken } from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import { api } from '../services/auth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

store.dispatch(checkToken());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infserred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
