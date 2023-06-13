import style from './QuestionsRemainBlock.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";
import BlockTitle from "../BlockTitles/BlockTitle";
import useWindow from "../../../../hooks/useWindow";

const QuestionsRemainBlock = () => {
  const { windowSize } = useWindow();
  return (
    <div>
    {windowSize.width > 576 ? (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.QuestionsRemainBlockContainer}>
        <div className={style.QuestionsRemainBlockText}>
          <BlockTitle className={style.h2} value={"Остались вопросы?"}/>
          <div className={style.text}>Пишите нам в телеграме.</div>
        </div>
        <div className={style.QuestionsRemainBlockButton}>
          <AppButton color={'primary'}>Перейти</AppButton>
        </div>
      </div>
    </div>
      ):(
        <div>
          <div className={style.QuestionsRemainBlockContainer}>
            <div className={style.QuestionsRemainBlockText}>
              <BlockTitle className={style.h2} value={"Остались вопросы?"}/>
              <div className={style.text}>Пишите нам в телеграме.</div>
            </div>
            <div className={style.QuestionsRemainBlockButton}>
              <AppButton color={'primary'}>Перейти</AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsRemainBlock;