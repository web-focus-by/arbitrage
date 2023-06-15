import style from './Page404Component.module.scss';
import classNames from 'classnames';
import logo404 from '../../../public/page404/404.svg';
import AppButton from '../../components/button/AppButton';
import { useIntl } from 'react-intl';

const Page404Component = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  return (
    <div className={style.page404_container}>
      <div className={style.page404_img}>
        <img src={logo404} alt={'logo 404'} />
      </div>

      <div className={classNames(style.page404_text, style.text)}>{formatMessage({ id: 'page404.text' })}</div>
      <div className={style.page404_button} onClick={navigate('/')}>
        <AppButton color={'primary'}>{formatMessage({ id: 'page404.button' })}</AppButton>
      </div>
    </div>
  );
};

export default Page404Component;
