import style from './mainHeadline.module.scss';
import classNames from 'classnames';
import imgHeadline from '../../../../../public/imgHeadline.png';
import AppButton from '../../../../components/button/AppButton';

const MainHeadline = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.container_headline, style.spacing_between_blocks)}>
      <div className={style.text_headline}>
        <h1>Сервис по поиску арбитражных сделок</h1>
        <div className={classNames(style.main_headline_second_text, style.text)}>
          Мониторинг спредов в реальном времени для любых сумм между m биржами.
        </div>
        <div className={style.main_headline_button}>
          <AppButton color={'primary'}>Выбрать тариф</AppButton>
        </div>
      </div>
      <div className={style.img_headline}>
        <img src={imgHeadline} />
      </div>
    </div>
  );
};

export default MainHeadline;
