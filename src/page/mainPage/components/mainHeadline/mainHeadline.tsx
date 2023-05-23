import style from './mainHeadline.module.scss';
import classNames from "classnames";
import PrimaryButton from "../primaryButton/PrimaryButton";

const MainHeadline = () => {
  return (
      <div className={classNames(style.mainPageContainer, style.container_headline, style.container, style.spacing_between_blocks)}>
        <div className={style.text_headline}>
          <div className={style.main_headline_text}>
            Сервис по поиску арбитражных сделок
          </div>
          <div className={style.main_headline_second_text}>
            Мониторинг спредов в реальном времени для любых сумм между m биржами.
          </div>
          {/*<PrimaryButton value={"Выбрать тариф"}></PrimaryButton>*/}
        </div>
        <div className={style.img_headline}>
          <img src={'src/page/mainPage/img/img_headline.jpg'}/>
        </div>
      </div>
  );
};

export default MainHeadline;