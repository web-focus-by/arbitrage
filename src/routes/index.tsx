import MainPage from '../page/MainPage';
import ErrorPage from '../page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateOutlet } from './PrivateOutlet';
import PrivateRoute from '../page/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <PrivateOutlet />,
    children: [
      {
        path: 'private',
        element: <PrivateRoute />,
      },
    ],
  },
]);

export default router;
