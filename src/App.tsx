import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import russian from './lang/ru';
import english from './lang/eng';
import router from './routes';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  const dictionary = navigator.language.includes('en') ? english : russian;

  useEffect(() => {
    console.log(navigator);
  }, [navigator]);

  return (
    <Provider store={store}>
      <IntlProvider messages={dictionary} locale={navigator.language} defaultLocale="ru">
        <RouterProvider router={router} />
      </IntlProvider>
    </Provider>
  );
};

export default App;
