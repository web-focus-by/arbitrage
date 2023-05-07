import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import { api } from '../services/auth';

export const index = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof index.getState>;
// Infserred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof index.dispatch;
