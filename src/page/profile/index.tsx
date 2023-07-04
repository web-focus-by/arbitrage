import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { useIntl } from 'react-intl';
import style from './style.module.scss';
import AppLink from '../../components/link/AppLink.tsx';
import classNames from 'classnames';
import ProfileForm from './components/profileForm/ProfileForm.tsx';
import useWindow from '../../hooks/useWindow.ts';
import Subscription from './components/subscription/Subscription.tsx';

const additionalData = [
  { name: 'profile.additional.resources.inter.exchange.bot', link: '/' },
  { name: 'profile.additional.resources.intra.exchange.bot', link: '/' },
  { name: 'profile.additional.resources.chat', link: '' },
];
const Profile = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();

  return (
    <>
      <Header />
      <div className={'container containerPadding'}>
        <div className={style.wrapper}>
          <h3 className={classNames({ h1: windowSize.width < 1200 })}>{formatMessage({ id: 'profile.title' })}</h3>
          <div className={style.content}>
            <ProfileForm />
            <div>
              <div>
                <h4>{formatMessage({ id: 'profile.additional.resources' })}</h4>
                <div className={style.additionalDataWrapper}>
                  {additionalData.map((item, index) => (
                    <div className={style.textItem} key={item.name + index}>
                      <div className={'text'}>{formatMessage({ id: item.name })}</div>
                      {item.link === '' ? '-' : <AppLink to={item.link}>{formatMessage({ id: 'link' })}</AppLink>}
                    </div>
                  ))}
                </div>
              </div>
              <Subscription />
              <div className={style.deleteAcc}>
                <div className={style.textItem}>
                  <div className={'text'}>{formatMessage({ id: 'profile.delete.text' })}</div>
                  <AppLink to={'/'} color={'error'}>
                    {formatMessage({ id: 'delete' })}
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
