import React from 'react';
import { useAppDispatch } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../../features/auth/authSlice.ts';
import { useLogoutMutation } from '../../services/auth.ts';

const Footer = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      console.log('logout');
      const data = await logout();
      console.log(data);

      dispatch(logoutAction());
    } catch (e) {
      //Обработка ошибки
    }
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
