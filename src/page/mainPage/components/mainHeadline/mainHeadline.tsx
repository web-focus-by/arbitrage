import style from './mainHeadline.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";

const MainHeadline = () => {
  return (
      <div className={classNames(style.mainPageContainer, style.container_headline, style.container, style.spacing_between_blocks)}>
        <div className={style.text_headline}>
          <h1>
            Сервис по поиску арбитражных сделок
          </h1>
          <div className={style.main_headline_second_text}>
            Мониторинг спредов в реальном времени для любых сумм между m биржами.
          </div>
          <div className={style.main_headline_button}>
            <AppButton color={'primary'}>Выбрать тариф</AppButton>
          </div>
        </div>
        <div className={style.img_headline}>
          <img src={'src/page/mainPage/img/img_headline.jpg'}/>
        </div>
      </div>
  );
};

export default MainHeadline;