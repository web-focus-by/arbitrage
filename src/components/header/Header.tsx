import { useEffect, useState } from 'react';
import appLogo from '../../../public/logo.svg';
import style from './header.module.scss';
import classNames from 'classnames';
import { useAuth } from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme.ts';
import { ETheme } from '../../features/theme/type.ts';
import Modal from '../modal/Modal.tsx';
import AuthModal from './authModal/AuthModal.tsx';
import AppButton from '../button/AppButton';
import AppSwitch from '../switch/AppSwitch.tsx';
import useWindow from '../../hooks/useWindow';
import AuthBlock from './authBlock/AuthBlock.tsx';

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
const Header = () => {
  const auth = useAuth();
  const { theme, setThemeHandler } = useTheme();
  const { windowSize } = useWindow();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const handleClickOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleClickBurger = () => {
    setIsOpenBurger((prevState) => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = isOpenModal || isOpenBurger ? 'hidden' : 'auto';
  }, [isOpenModal, isOpenBurger]);

  return (
    <header className={style.header}>
      {windowSize.width > 1200 ? (
        <div className={classNames(style.header__container)}>
          <div className={style.header__logo}>
            <img src={appLogo} className="logo" alt="Vite logo" />
            <div className={style.h1}>Arbitrage Services</div>
          </div>
          <nav className={style.header__nav}>
            <ul className={style.header__nav__list}>
              {navItems.map((el, i) => (
                <a key={'nav_el_' + i} href={'/#' + el}>
                  <li className={classNames(style.header__nav__item, style.subtitle3)}>{el}</li>
                </a>
              ))}
            </ul>
          </nav>
          <div>
            <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
          </div>
          <div>
            {auth ? (
              <AuthBlock />
            ) : (
              <AppButton
                onClick={() => {
                  handleClickOpenModal();
                }}
                color={'secondary'}
                className={style.authButton}
              >
                Войти
              </AppButton>
            )}
          </div>
        </div>
      ) : (
        <div>
          {windowSize.width > 720 ? (
            <div className={classNames(style.header__container)}>
              <div className={style.burgerAndLogo}>
                <div className={style.burgerButton}>
                  <div onClick={handleClickBurger}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 16H27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 8H27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 24H27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className={classNames(style.burgerTextBlock, { [style.openBurgerMenu]: isOpenBurger })}>
                    <nav className={style.header__nav}>
                      <ul className={style.header__nav__list}>
                        {navItems.map((el, i) => (
                          <a href={'/#' + el} key={'nav_el_' + i}>
                            <li className={classNames(style.header__nav__item, style.subtitle3)}>{el}</li>
                          </a>
                        ))}
                      </ul>
                    </nav>
                    <div className={style.burgerCross} onClick={handleClickBurger}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M25 7L7 25"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25 25L7 7"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={style.header__logo}>
                  <img src={appLogo} className="logo" alt="Vite logo" />
                  <div className={style.h1}>Arbitrage Services</div>
                </div>
              </div>

              <div className={style.switchAndButton}>
                <div>
                  <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
                </div>
                <div>
                  {auth ? (
                    <AuthBlock />
                  ) : (
                    <AppButton
                      onClick={() => {
                        handleClickOpenModal();
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
          ) : (
            <div className={classNames(style.header__container)}>
              {auth ? (
                <div className={style.burgerAndLogo}>
                  <div className={style.burgerAndLogo_container}>
                    <div className={style.burgerButton}>
                      <div onClick={handleClickBurger}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 16H27"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 8H27"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 24H27"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className={classNames(style.burgerTextBlock, { [style.openBurgerMenu]: isOpenBurger })}>
                        <div className={style.burgerMobileMenu}>
                          <nav className={style.header__nav}>
                            <ul className={style.header__nav__list}>
                              {navItems.map((el, i) => (
                                <a key={'nav_el_' + i} href={'/#' + el}>
                                  <li className={classNames(style.header__nav__item, style.subtitle3)}>{el}</li>
                                </a>
                              ))}
                            </ul>
                          </nav>
                          <div className={style.switchAndButton}>
                            <div>
                              <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
                            </div>
                          </div>
                        </div>
                        <div className={style.burgerCross} onClick={handleClickBurger}>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25 7L7 25"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M25 25L7 7"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className={style.header__logo}>
                      <img src={appLogo} className="logo" alt="Vite logo" />
                      <div className={style.h1}>Arbitrage Services</div>
                    </div>
                  </div>
                  <AuthBlock />
                </div>
              ) : (
                <div className={classNames(style.burgerAndLogo, style.burgerAndLogoLogout)}>
                  <div className={style.burgerButton}>
                    <div onClick={handleClickBurger}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 16H27"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M5 8H27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M5 24H27"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className={classNames(style.burgerTextBlock, { [style.openBurgerMenu]: isOpenBurger })}>
                      <div className={style.burgerMobileMenu}>
                        <nav className={style.header__nav}>
                          <ul className={style.header__nav__list}>
                            {navItems.map((el, i) => (
                              <a key={'nav_el_' + i} href={'/#' + el}>
                                <li className={classNames(style.header__nav__item, style.subtitle3)}>{el}</li>
                              </a>
                            ))}
                          </ul>
                        </nav>
                        <div className={style.switchAndButton}>
                          <div>
                            <AppSwitch switchProps={{ onClick: setThemeHandler, checked: theme === ETheme.light }} />
                          </div>
                          <div>
                            <AppButton
                              onClick={() => {
                                handleClickOpenModal();
                              }}
                              color={'secondary'}
                              className={style.authButton}
                            >
                              Войти
                            </AppButton>
                          </div>
                        </div>
                      </div>
                      <div className={style.burgerCross} onClick={handleClickBurger}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M25 7L7 25"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M25 25L7 7"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={style.header__logo}>
                    <img src={appLogo} className="logo" alt="Vite logo" />
                    <div className={style.h1}>Arbitrage Services</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} children={<AuthModal />} classNames={style.modalWrapper} />
    </header>
  );
};

export default Header;
