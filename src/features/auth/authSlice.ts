import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IUserResponse } from '../../services/auth';
import { TCredentialsRestore } from '../../services/auth';
import { resetWebSocketStore } from '../../utils/webSoket.ts';

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  registerFinished: boolean;
  isAuth: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  registerFinished: false,
  isAuth: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user_info, access_token, refresh_token } }: PayloadAction<IUserResponse>) => {
      state.isAuth = true;
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
      resetWebSocketStore();
      return initialState;
    },
    checkToken: (state) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');
      if (token) {
        state.isAuth = true;
        state.accessToken = token;
        state.refreshToken = refreshToken;
      }
    },
  },
});

export const { setCredentials, logout, checkToken, restoreCredentials } = slice.actions;

export default slice.reducer;
