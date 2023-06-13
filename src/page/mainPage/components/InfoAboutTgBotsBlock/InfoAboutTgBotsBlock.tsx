import style from './InfoAboutTgBotsBlock.module.scss';
import classNames from 'classnames';
import AppButton from '../../../../components/button/AppButton';

const InfoAboutTgBotsBlock = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.InfoAboutTgBotsBlockContainer}>
        <div className={style.InfoAboutTgBotsBlockText}>
          <h3>
            В дополнение к браузерной версии сервис предоставляет удобные телеграм боты для межбиржевого и
            внутрибиржевого арбитража.
          </h3>
          <AppButton color={'primary'}>Перейти</AppButton>
        </div>
        <div className={style.InfoAboutTgBotsBlockImg}>
          <img src="src/page/mainPage/components/InfoAboutTgBotsBlock/img/InfoAboutTgBotsBlockImg.png" />
        </div>
      </div>
    </div>
  );
};

export default InfoAboutTgBotsBlock;
