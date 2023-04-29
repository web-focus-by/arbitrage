import React from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import russian from './lang/ru';
import english from './lang/eng';
import router from './routes';
import './App.css';

const App = () => {
  const dictionary = navigator.language.includes('en') ? english : russian;

  return (
    <IntlProvider messages={dictionary} locale={navigator.language} defaultLocale="ru">
      <RouterProvider router={router} />
    </IntlProvider>
  );
};

export default App;
