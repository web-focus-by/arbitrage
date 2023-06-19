import style from './footer.module.scss';
import classNames from 'classnames';
import appLogo from '../../../public/logo.svg';
import SocTelegram from '../../../public/footer/socTelegram';
import SocYoutube from '../../../public/footer/socYoutube';
import SocPhone from '../../../public/footer/socPhone';
import { useIntl } from 'react-intl';

const navItems = ['Преимущества', 'Видео', 'Сканер', 'Тарифы', 'Партнеры'];

const Footer = () => {
  const { formatMessage } = useIntl();
  return (
    <footer className={style.footer}>
      <div className={style.footerMainLine}>
        <div className={style.footer__logo}>
          <img src={appLogo} className="logo" alt="Vite logo" />
          {formatMessage({ id: 'logo.text' })}
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
          <SocYoutube />
          <SocTelegram />
          <SocPhone />
        </div>
      </div>

      <div className={classNames(style.footerEndLine, style.text2)}>
        <div>{formatMessage({ id: 'footer.designed' })}</div>
        <div>{formatMessage({ id: 'footer.privacy.policy' })}</div>
      </div>
    </footer>
  );
};

export default Footer;
