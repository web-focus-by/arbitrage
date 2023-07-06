import { apiGeneralInfo } from './services/generalInfo';
import { RouterProvider } from 'react-router-dom';
import LintWrapper from './LintWrapper';
import { Provider } from 'react-redux';
import React from 'react';
import router from './routes';
import { store } from './store';

const App = () => {
  store.dispatch(apiGeneralInfo.endpoints.getMarketsInfo.initiate());
  store.dispatch(apiGeneralInfo.endpoints.getVideosInfo.initiate());
  store.dispatch(apiGeneralInfo.endpoints.getSubscriptionsInfo.initiate());

  return (
    <Provider store={store}>
      <LintWrapper>
        <RouterProvider router={router} />
      </LintWrapper>
    </Provider>
  );
};

export default App;
