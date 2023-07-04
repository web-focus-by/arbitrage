import { createSlice } from '@reduxjs/toolkit';
import { ELanguage } from './languageType';

const getLanguage = () => {
  const language: ELanguage | string | null = window?.localStorage?.getItem('language');
  if (language === ELanguage.ru || language === ELanguage.en) {
    return language;
  }
  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return ELanguage.en;

  return ELanguage.ru;
};

const initialState = getLanguage();

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (_, action) => action.payload,
  },
});

export const { setLanguage } = slice.actions;

export default slice.reducer;
