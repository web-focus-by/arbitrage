import MainPage from '../page/MainPage';
import ErrorPage from '../page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/auth/Login';

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
]);

export default router;
