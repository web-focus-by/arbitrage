import ErrorPage from '../page/error-page';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Counter } from '../features/counter/Counter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Counter />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
