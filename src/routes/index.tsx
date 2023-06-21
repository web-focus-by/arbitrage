import MainPage from '../page/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateOutlet } from './PrivateOutlet';
import Dashboard from '../page/dashboard';
import Profile from '../page/profile';
import Page404 from '../page/Page404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <Page404 />,
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
