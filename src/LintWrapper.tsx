import russian from './lang/ru';
import english from './lang/eng';
import { IntlProvider } from 'react-intl';
import { useAppSelector } from './store/hooks';
import { ELanguage } from './features/language/languageType';

const LintWrapper = (props) => {
  const language = useAppSelector((state) => state.language);
  const dictionary = language === ELanguage.ru ? russian : english;

  return (
    <IntlProvider messages={dictionary} locale={language} defaultLocale="ru">
      {props.children}
    </IntlProvider>
  );
};

export default LintWrapper;
