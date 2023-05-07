import MainPage from '../page/MainPage';
import ErrorPage from '../page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/auth/Login';
import { PrivateOutlet } from './PrivateOutlet';
import PrivateRoute from '../page/PrivateRoute';
import Signup from '../features/auth/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
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
