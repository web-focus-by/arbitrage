import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../../public/logo.svg';
import style from './header.module.scss';
import classNames from 'classnames';
import { useAuth } from '../../hooks/useAuth';
import Switch from '@mui/material/Switch';
import useTheme from '../../hooks/useTheme.ts';
import { ETheme } from '../../features/theme/type.ts';
import Modal from '../modal/Modal.tsx';
import AuthModal from './authModal/AuthModal.tsx';
import AppButton from "../button/AppButton";

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { theme, setThemeHandler } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <header className={style.header}>
      <div className={classNames(style.header__container, 'container')}>
        <div className={style.header__logo}>
          <img src={appLogo} className="logo" alt="Vite logo" />
        </div>
        <nav className={style.header__nav}>
          <ul className={style.header__nav__list}>
            {navItems.map((el, i) => (
              <li key={'nav_el_' + i} className={classNames(style.header__nav__item, style.subtitle3)}>
                {el}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Switch onClick={setThemeHandler} checked={theme === ETheme.light} />
        </div>
        <div>
          {auth.user ? (
            <AppButton
              onClick={() => {
                navigate('/dashboard');
              }}
              color={'secondary'}
            >
              Кабинет
            </AppButton>
          ) : (
            <AppButton
              onClick={() => {
                handleClickOpen();
              }}
              color={'secondary'}
            >
              Войти
            </AppButton>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} children={<AuthModal />} classNames={style.modalWrapper} />
    </header>
  );
};

export default Header;
