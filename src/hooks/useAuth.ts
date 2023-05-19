import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
