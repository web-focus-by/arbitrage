import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { apiUserInfo } from '../services/userInfo.ts';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(apiUserInfo.endpoints.getUserInfo.initiate());
    }
  }, [dispatch, isAuth]);

  return isAuth;
};
