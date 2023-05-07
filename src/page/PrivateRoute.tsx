import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={'container'}>
      <div>PrivateRoute</div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Landing
      </button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default PrivateRoute;
