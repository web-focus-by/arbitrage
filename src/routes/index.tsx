import MainPage from '../page/MainPage';
import ErrorPage from '../page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
