import React from 'react';
import { useAppDispatch } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice.ts';

const Footer = () => {
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
      <button
        onClick={() => {
          navigate('/profile');
        }}
      >
        Profile
      </button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Footer;
