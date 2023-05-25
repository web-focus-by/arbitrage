import MainPage from '../page/MainPage';
import ErrorPage from '../page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateOutlet } from './PrivateOutlet';
import Dashboard from '../page/Dashboard.tsx';
import Profile from '../page/profile';

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
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
