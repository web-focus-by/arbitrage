import { useEffect } from 'react';
import { setTheme } from '../features/theme/themeSlice.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { ETheme } from '../features/theme/type.ts';

const useTheme = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setThemeHandler = () => {
    const next = theme === ETheme.dark ? ETheme.light : ETheme.dark;
    dispatch(setTheme(next));
  };
  return { setThemeHandler, theme };
};

export default useTheme;
