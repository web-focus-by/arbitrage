import appLogo from '../../../public/logo.svg';
import style from './header.module.scss';
import classNames from 'classnames';

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];
const Header = () => {
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
        <div>Переключение темы</div>
        <div>
          <button>Войти</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
