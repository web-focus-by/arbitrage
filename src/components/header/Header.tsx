import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../../public/logo.svg';
import style from './header.module.scss';
import classNames from 'classnames';
import { useAuth } from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme.ts';
import { ETheme } from '../../features/theme/type.ts';
import Modal from '../modal/Modal.tsx';
import AuthModal from './authModal/AuthModal.tsx';
import AppButton from "../button/AppButton";
import AppSwitch from '../switch/AppSwitch.tsx';
import useWindow from "../../hooks/useWindow";
import { set } from "react-hook-form";

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { theme, setThemeHandler } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [openBurger, setOpenBurger] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickBurger = () => {
    if(openBurger.valueOf()){
      setOpenBurger(false)
    } else {
      setOpenBurger(true)
    }
  }

  const { windowSize } = useWindow();

  return (
    <header className={style.header}>
      {windowSize.width > 1200 ? (
      <div className={classNames(style.header__container)}>
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
          <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
        </div>
        <div>
          {auth.user ? (
            <AppButton
              onClick={() => {
                navigate('/dashboard');
              }}
              color={'secondary'}
              className={style.authButton}
            >
              Кабинет
            </AppButton>
          ) : (
            <AppButton
              onClick={() => {
                handleClickOpen();
              }}
              color={'secondary'}
              className={style.authButton}
            >
              Войти
            </AppButton>
          )}
        </div>
      </div>
        ):(
          <div>
          {windowSize.width > 720 ? (
            <div className={classNames(style.header__container)}>
              <div className={style.burgerAndLogo}>
                <div className={style.burgerButton} onClick={handleClickBurger}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 8H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 24H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div className={classNames(style.burgerTextBlock, {[style.openBurgerMenu]:openBurger})}>
                    <nav className={style.header__nav}>
                      <ul className={style.header__nav__list}>
                        {navItems.map((el, i) => (
                          <li key={'nav_el_' + i} className={classNames(style.header__nav__item, style.subtitle3)}>
                            {el}
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className={style.burgerCross} onClick={handleClickBurger}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 7L7 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M25 25L7 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={style.header__logo}>
                  <img src={appLogo} className="logo" alt="Vite logo" />
                </div>
              </div>

              <div className={style.switchAndButton}>
                <div>
                  <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
                </div>
                <div>
                  {auth.user ? (
                    <AppButton
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                      color={'secondary'}
                      className={style.authButton}
                    >
                      Кабинет
                    </AppButton>
                  ) : (
                    <AppButton
                      onClick={() => {
                        handleClickOpen();
                      }}
                      color={'secondary'}
                      className={style.authButton}
                    >
                      Войти
                    </AppButton>
                  )}
                </div>
              </div>
            </div>
          ):(
            <div className={classNames(style.header__container)}>
              <div className={style.burgerAndLogo}>
                <div className={style.burgerButton} onClick={handleClickBurger}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 8H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 24H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div className={classNames(style.burgerTextBlock, {[style.openBurgerMenu]:openBurger})}>
                    <div className={style.burgerMobileMenu}>
                      <nav className={style.header__nav}>
                        <ul className={style.header__nav__list}>
                          {navItems.map((el, i) => (
                              <li key={'nav_el_' + i} className={classNames(style.header__nav__item, style.subtitle3)}>
                                {el}
                              </li>
                          ))}
                        </ul>
                      </nav>
                      <div className={style.switchAndButton}>
                        <div>
                          <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
                        </div>
                        <div>
                          {auth.user ? (
                            <AppButton
                              onClick={() => {
                                navigate('/dashboard');
                              }}
                              color={'secondary'}
                              className={style.authButton}
                            >
                              Кабинет
                            </AppButton>
                          ) : (
                            <AppButton
                              onClick={() => {
                                handleClickOpen();
                              }}
                              color={'secondary'}
                              className={style.authButton}
                            >
                              Войти
                            </AppButton>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={style.burgerCross} onClick={handleClickBurger}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 7L7 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M25 25L7 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={style.header__logo}>
                  <img src={appLogo} className="logo" alt="Vite logo" />
                </div>
              </div>
            </div>
          )}
          </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} children={<AuthModal />} classNames={style.modalWrapper} />
    </header>
  );
};

export default Header;
