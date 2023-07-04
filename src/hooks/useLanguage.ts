import { useEffect } from 'react';
import { setLanguage } from '../features/language/languageSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { ELanguage } from '../features/language/languageType';

const useLanguage = () => {
  const language = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.dataset.language = language;
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguageHandler = () => {
    const next = language === ELanguage.ru ? ELanguage.en : ELanguage.ru;
    dispatch(setLanguage(next));
  };
  return { setLanguageHandler, language };
};

export default useLanguage;
