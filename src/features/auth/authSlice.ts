import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IUserResponse } from '../../services/auth';
import { RootState } from '../../store';
import { TCredentialsRestore } from '../../services/auth';

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  registerFinished: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  registerFinished: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user_info, access_token, refresh_token } }: PayloadAction<IUserResponse>) => {
      state.user = user_info;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
    },
    restoreCredentials: (state, { payload: { access_token, refresh_token } }: PayloadAction<TCredentialsRestore>) => {
      localStorage.setItem('token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      state.accessToken = access_token ?? state.accessToken;
      state.refreshToken = refresh_token ?? state.refreshToken;
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refresh_token');
      return initialState;
    },
    checkToken: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const refreshToken = localStorage.getItem('refresh_token');
      if (token && user) {
        state.accessToken = token;
        state.refreshToken = refreshToken;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { setCredentials, logout, checkToken, restoreCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
