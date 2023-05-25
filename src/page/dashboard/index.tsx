import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Dashboard;
