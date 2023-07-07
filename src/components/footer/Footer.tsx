import style from './footer.module.scss';
import classNames from 'classnames';
import appLogo from '../../../public/logo.svg';
import SocTelegram from '../../../public/footer/socTelegram';
import SocYoutube from '../../../public/footer/socYoutube';
import SocPhone from '../../../public/footer/socPhone';
import { useIntl } from 'react-intl';

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
              <a key={'nav_el_' + i} href={'/#' + el.href}>
                <li className={classNames(style.footer__nav__item, style.text)}>{formatMessage({ id: el.title })}</li>
              </a>
            ))}
          </ul>
        </nav>

        <div className={style.footer_social}>
          <SocYoutube />
          <SocTelegram />
          <SocPhone />
        </div>
      </div>

      <div className={classNames(style.footerEndLine, style.text2, style.text2GrayColor)}>
        <div>{formatMessage({ id: 'footer.designed' })}</div>
        <div>{formatMessage({ id: 'footer.privacy.policy' })}</div>
      </div>
    </footer>
  );
};

export default Footer;
