import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AppFullScreenLoading from '../components/loading/AppFullScreenLoading.tsx';
import { useAppSelector } from '../store/hooks.ts';
import { selectUserInfoIsLoading } from '../features/userInfo/userInfoSelect.ts';

export function PrivateOutlet() {
  const isLoading = useAppSelector(selectUserInfoIsLoading);
  const auth = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <>
        <Outlet />
        <AppFullScreenLoading open={isLoading} />
      </>
    );
  }

  return auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}
