import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserResponse } from '../../services/auth';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, access_token, refresh_token } }: PayloadAction<UserResponse>) => {
      state.user = user;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;
