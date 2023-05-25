import style from './InfoAboutTgBotsBlock.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";
import BlockTitle from "../BlockTitles/BlockTitle";

const InfoAboutTgBotsBlock = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <div className={style.InfoAboutTgBotsBlockContainer}>
        <div className={style.InfoAboutTgBotsBlockText}>
          <BlockTitle value={"В дополнение к браузерной версии сервис предоставляет удобные телеграм боты для межбиржевого и внутрибиржевого арбитража."}/>
          <AppButton color={'primary'}>Перейти</AppButton>
        </div>
        <div>
          <img src='src/page/mainPage/components/InfoAboutTgBotsBlock/img/InfoAboutTgBotsBlockImg.png'/>
        </div>
      </div>
    </div>
  );
};

export default InfoAboutTgBotsBlock;