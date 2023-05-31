import style from './footer.module.scss';
import social_youtube from './img/social_youtube.svg';
import social_telegram from './img/social_telegram.svg';
import phone from './img/tel.svg';
import appLogo from '../../../public/logo.svg';
import classNames from 'classnames';

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
import React from 'react';
import { useAppDispatch } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice.ts';

const Footer = () => {

  return (
    <footer className={style.footer}>
      <div className={style.footerMainLine}>
        <div>
          <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8093 0.164978C41.9661 0.277575 40.9313 0.450099 40.5097 0.548486C38.4912 1.01895 35.6323 2.17458 35.7124 2.48765C35.737 2.58342 36.4404 4.57572 37.2754 6.91492L38.794 11.1683L39.3082 10.5948C40.0171 9.80444 41.6659 8.96962 43.2886 8.57993C44.9969 8.16955 48.1944 8.13186 49.9383 8.50162C52.979 9.14632 54.8215 11.0189 55.6906 14.3479C55.9382 15.2962 55.9989 15.3906 56.3617 15.3929C56.5811 15.3943 58.8206 15.3112 61.3384 15.2082L65.9163 15.021L65.8111 13.9315C65.4754 10.4525 64.2723 7.58371 62.1896 5.29547C59.7808 2.64875 56.783 1.13062 52.3912 0.333023C50.4413 -0.0209848 44.9264 -0.117827 42.8093 0.164978ZM19.1797 2.37768C16.6017 9.07141 14.2991 15.0329 12.0661 20.7963C9.29536 27.9475 7.60113 32.3332 5.6222 37.4773C5.0502 38.9639 3.55128 42.8397 2.29122 46.0901L0 52L5.15092 51.9594L10.3017 51.9188L13.7938 42.7288C15.7145 37.6743 18.8771 29.1252 20.8219 23.7309C22.7668 18.3366 24.4047 13.8743 24.4621 13.8145C24.5192 13.7549 25.7318 16.8826 27.1563 20.765C28.581 24.6475 31.818 33.2626 34.3498 39.91L38.953 51.996H43.1515C45.4607 51.996 47.3177 51.9433 47.2783 51.8789C47.1974 51.7472 46.3965 49.526 40.275 32.4576C33.4444 13.4123 29.3947 2.08144 29.3947 2.01456C29.3947 1.98074 27.1332 1.95294 24.369 1.95294H19.3433L19.1797 2.37768ZM40.8929 16.9944C40.8929 17.1107 45.1585 28.852 45.225 28.919C45.2677 28.962 46.5007 29.3078 47.9653 29.6874C54.1897 31.301 55.8648 32.1431 56.8464 34.1521C57.2927 35.0652 57.3254 35.2385 57.2749 36.4284C57.2297 37.4986 57.1376 37.8854 56.7301 38.7167C55.8248 40.5625 53.8055 42.1556 51.7364 42.6563C51.1269 42.8038 50.5481 42.9674 50.4505 43.0197C50.3283 43.0851 50.72 44.3711 51.7029 47.1307L53.1329 51.1465L53.6436 51.1051C54.5104 51.0347 56.6132 50.4586 57.9894 49.9143C62.3261 48.199 65.577 44.5504 66.8412 39.9792C67.1241 38.9568 67.1696 38.3895 67.1665 35.9328C67.1633 33.4788 67.1153 32.901 66.8268 31.8398C65.7184 27.7623 63.077 24.6831 59.0618 22.7875C57.1173 21.8695 53.6941 20.7702 49.2484 19.6364C45.2848 18.6253 43.2358 17.994 41.6978 17.31C41.2552 17.113 40.8929 16.9711 40.8929 16.9944ZM21.076 42.0184C19.1586 47.3069 17.5898 51.6806 17.5898 51.7377C17.5898 51.7949 20.7538 51.8415 24.6209 51.8415H31.652L30.6878 49.1772C27.3349 39.9117 24.6259 32.467 24.5965 32.4373C24.5777 32.4185 22.9935 36.7299 21.076 42.0184Z" fill="#FFFFFF"/>
          </svg>
          Arbitrage Services
        </div>
        <nav className={style.footer__nav}>
          <ul className={style.footer__nav__list}>
            {navItems.map((el, i) => (
              <li key={'nav_el_' + i} className={classNames(style.footer__nav__item, style.text)}>
                {el}
              </li>
            ))}
          </ul>
        </nav>

        <div className={style.footer_social}>
          <img src={social_youtube} alt="YouTube"/>
          <img src={social_telegram} alt="Telegram"/>
          <img src={phone} alt="Phone"/>
        </div>
      </div>

      <div className={classNames(style.footerEndLine, style.text2)}>
        <div>© Decipad 2023 · Designed on the internet</div>
        <div>Политика конфиденциальности</div>
      </div>
    </footer>
  );
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
