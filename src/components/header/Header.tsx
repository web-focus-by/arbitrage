import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../../public/logo.svg';
import style from './header.module.scss';
import classNames from 'classnames';
import { useAuth } from '../../hooks/useAuth';
import Switch from '@mui/material/Switch';
import useTheme from '../../features/theme/useTheme.tsx';
import { ETheme } from '../../features/theme/type.ts';
import Modal from '../modal/Modal.tsx';

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
const ModalContent = () => <div>ModalContent</div>;
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
          <div className={style.header__logo_wrapper}>
            <img src={appLogo} className="logo" alt="Vite logo" />
          </div>
          <h1>Arbitrage Services</h1>
        </div>
        <nav className={style.header__nav}>
          <ul className={style.header__nav__list}>
            {navItems.map((el, i) => (
              <li key={'nav_el_' + i} className={style.header__nav__item}>
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
            <button
              onClick={() => {
                navigate('/private');
              }}
            >
              Кабинет
            </button>
          ) : (
            <button
              onClick={() => {
                // navigate('/login');
                handleClickOpen();
              }}
            >
              Войти
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} children={<ModalContent />} />
    </header>
  );
};

export default Header;
