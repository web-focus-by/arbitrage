import style from './Page404Component.module.scss';
import classNames from 'classnames';
import logo404 from '../../../public/page404/404.svg';
import AppButton from '../../components/button/AppButton';

const Page404Component = () => {
  return (
    <div className={style.page404_container}>
      <div className={style.page404_img}>
        <img src={logo404} alt={'logo 404'} />
      </div>
      <div className={classNames(style.page404_text, style.text)}>
        Мы не можем найти эту страницу, воспользуйтесь навигацией или вернитесь на главную страницу сайта.
      </div>
      <div className={style.page404_button}>
        <AppButton color={'primary'}>На главную</AppButton>
      </div>
    </div>
  );
};

export default Page404Component;
