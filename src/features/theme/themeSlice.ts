import { createSlice } from '@reduxjs/toolkit';
import { ETheme } from './type.ts';

const getTheme = () => {
  const theme: ETheme | string | null = window?.localStorage?.getItem('theme');
  if (theme === ETheme.dark || theme === ETheme.light) {
    return theme;
  }
  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return ETheme.light;

  return ETheme.dark;
};

const initialState = getTheme();

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;
