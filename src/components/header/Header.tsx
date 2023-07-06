import { MouseEvent, useEffect, useState } from 'react';
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
import { useIntl } from 'react-intl';
import { IconButton, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import useLanguage from '../../hooks/useLanguage';
import { ELanguage } from '../../features/language/languageType';
import { useAppSelector } from '../../store/hooks';

const navItems = [
  {
    href: 'advantages',
    key: 'adv_headline_id',
    title: 'adv_headline',
  },
  {
    href: 'video',
    key: 'video_headline_id',
    title: 'videoBlock.headline',
  },
  {
    href: 'scanner',
    key: 'scanner_headline_id',
    title: 'scanner.title',
  },
  {
    href: 'rates',
    key: 'rates_headline_id',
    title: 'ratesBlock.headline',
  },
  {
    href: 'partners',
    key: 'partners_headline_id',
    title: 'ourPartners.title',
  },
];
const Header = () => {
  const auth = useAuth();
  const { theme, setThemeHandler } = useTheme();
  const { language, setLanguageHandler } = useLanguage();
  const { windowSize } = useWindow();

  const { formatMessage } = useIntl();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const handleClickOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleClickBurger = () => {
    setIsOpenBurger((prevState) => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = isOpenBurger ? 'hidden' : 'auto';
  }, [isOpenBurger]);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = (rout: string | object) => {
    setAnchorElUser(null);
  };

  const lang = useAppSelector((state) => state.language);
  const handleLanguageBrowser = (str: string) => {
    if (str === 'ru') {
      setLanguageHandler(ELanguage.ru);
    } else {
      setLanguageHandler(ELanguage.en);
    }

    setAnchorElUser(null);
  };

  return (
    <header className={style.header}>
      {windowSize.width > 1200 ? (
        <div className={classNames(style.header__container)}>
          <div className={style.header__logo}>
            <div className={style.header__logo_container}>
              <img src={appLogo} className="logo" alt="Vite logo" />
              <div className={style.h1}>{formatMessage({ id: 'logo.text' })}</div>
            </div>
            <div>
              <div className={style.text2}>
                {lang === 'ru' ? formatMessage({ id: 'LangRussian' }) : formatMessage({ id: 'LangEnglish' })}
                <IconButton onClick={handleOpenUserMenu} disableRipple={true} classes={{ root: style.arrowWrapper }}>
                  {anchorElUser ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                classes={{
                  paper: style.menuLang,
                  list: style.listLang,
                }}
              >
                <MenuItem
                  onClick={() => handleLanguageBrowser('ru')}
                  classes={{
                    root: classNames(style.menuLangItem, 'text', { ['text2']: windowSize.width < 1366 }),
                  }}
                >
                  {formatMessage({ id: 'LangRussian' })}
                </MenuItem>
                <MenuItem
                  onClick={() => handleLanguageBrowser('en')}
                  classes={{
                    root: classNames(style.menuLangItem, 'text', { ['text2']: windowSize.width < 1366 }),
                  }}
                >
                  {formatMessage({ id: 'LangEnglish' })}
                </MenuItem>
              </Menu>
            </div>
          </div>

          <nav className={style.header__nav}>
            <ul className={style.header__nav__list}>
              {navItems.map((el, i) => (
                <a key={'nav_el_' + i} href={'/#' + el.href}>
                  <li className={classNames(style.header__nav__item, style.subtitle3)}>
                    {formatMessage({ id: el.title })}
                  </li>
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
                {formatMessage({ id: 'button.enter' })}
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
                          <a key={'nav_el_' + i} href={'/#' + el.href}>
                            <li className={classNames(style.header__nav__item, style.subtitle3)}>
                              {formatMessage({ id: el.title })}
                            </li>
                          </a>
                        ))}
                      </ul>
                    </nav>
                    <div className={style.langMobile}>
                      <div className={style.text2}>
                        {lang === 'ru' ? formatMessage({ id: 'LangRussian' }) : formatMessage({ id: 'LangEnglish' })}
                        <IconButton
                          onClick={handleOpenUserMenu}
                          disableRipple={true}
                          classes={{ root: style.arrowWrapper }}
                        >
                          {anchorElUser ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </div>
                      <Menu
                        sx={{ mt: '45px' }}
                        anchorEl={anchorElUser}
                        id="menu-appbar"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        classes={{
                          paper: style.menuLang,
                          list: style.listLang,
                        }}
                      >
                        <MenuItem
                          onClick={() => handleLanguageBrowser('ru')}
                          classes={{
                            root: classNames(style.menuLangItem, 'text', { ['text2']: windowSize.width < 1366 }),
                          }}
                        >
                          {formatMessage({ id: 'LangRussian' })}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleLanguageBrowser('en')}
                          classes={{
                            root: classNames(style.menuLangItem, 'text', { ['text2']: windowSize.width < 1366 }),
                          }}
                        >
                          {formatMessage({ id: 'LangEnglish' })}
                        </MenuItem>
                      </Menu>
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
                      {formatMessage({ id: 'button.enter' })}
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
                                <a key={'nav_el_' + i} href={'/#' + el.href}>
                                  <li className={classNames(style.header__nav__item, style.subtitle3)}>
                                    {formatMessage({ id: el.title })}
                                  </li>
                                </a>
                              ))}
                            </ul>
                          </nav>
                          <div className={style.switchAndButton}>
                            <div className={style.switchWithLang}>
                              <div className={style.langMobile}>
                                <div className={style.text2}>
                                  {lang === 'ru'
                                    ? formatMessage({ id: 'LangRussian' })
                                    : formatMessage({ id: 'LangEnglish' })}
                                  <IconButton
                                    onClick={handleOpenUserMenu}
                                    disableRipple={true}
                                    classes={{ root: style.arrowWrapper }}
                                  >
                                    {anchorElUser ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                  </IconButton>
                                </div>
                                <Menu
                                  sx={{ mt: '45px' }}
                                  anchorEl={anchorElUser}
                                  id="menu-appbar"
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  open={Boolean(anchorElUser)}
                                  onClose={handleCloseUserMenu}
                                  classes={{
                                    paper: style.menuLang,
                                    list: style.listLang,
                                  }}
                                >
                                  <MenuItem
                                    onClick={() => handleLanguageBrowser('ru')}
                                    classes={{
                                      root: classNames(style.menuLangItem, 'text', {
                                        ['text2']: windowSize.width < 1366,
                                      }),
                                    }}
                                  >
                                    {formatMessage({ id: 'LangRussian' })}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => handleLanguageBrowser('en')}
                                    classes={{
                                      root: classNames(style.menuLangItem, 'text', {
                                        ['text2']: windowSize.width < 1366,
                                      }),
                                    }}
                                  >
                                    {formatMessage({ id: 'LangEnglish' })}
                                  </MenuItem>
                                </Menu>
                              </div>
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
                              <a key={'nav_el_' + i} href={'/#' + el.href}>
                                <li className={classNames(style.header__nav__item, style.subtitle3)}>
                                  {formatMessage({ id: el.title })}
                                </li>
                              </a>
                            ))}
                          </ul>
                        </nav>
                        <div className={style.switchAndButton}>
                          <div className={style.switchWithLang}>
                            <div className={style.langMobile}>
                              <div className={style.text2}>
                                {lang === 'ru'
                                  ? formatMessage({ id: 'LangRussian' })
                                  : formatMessage({ id: 'LangEnglish' })}
                                <IconButton
                                  onClick={handleOpenUserMenu}
                                  disableRipple={true}
                                  classes={{ root: style.arrowWrapper }}
                                >
                                  {anchorElUser ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                              </div>
                              <Menu
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                id="menu-appbar"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                classes={{
                                  paper: style.menuLang,
                                  list: style.listLang,
                                }}
                              >
                                <MenuItem
                                  onClick={() => handleLanguageBrowser('ru')}
                                  classes={{
                                    root: classNames(style.menuLangItem, 'text', {
                                      ['text2']: windowSize.width < 1366,
                                    }),
                                  }}
                                >
                                  {formatMessage({ id: 'LangRussian' })}
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleLanguageBrowser('en')}
                                  classes={{
                                    root: classNames(style.menuLangItem, 'text', {
                                      ['text2']: windowSize.width < 1366,
                                    }),
                                  }}
                                >
                                  {formatMessage({ id: 'LangEnglish' })}
                                </MenuItem>
                              </Menu>
                            </div>
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
                              {formatMessage({ id: 'button.enter' })}
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
