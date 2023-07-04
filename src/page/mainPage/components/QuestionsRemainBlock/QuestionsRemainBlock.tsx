import style from './QuestionsRemainBlock.module.scss';
import classNames from 'classnames';
import AppButton from '../../../../components/button/AppButton';
import BlockTitle from '../BlockTitles/BlockTitle';
import useWindow from '../../../../hooks/useWindow';
import { useIntl } from 'react-intl';

const QuestionsRemainBlock = () => {
  const { windowSize } = useWindow();
  const { formatMessage } = useIntl();
  return (
    <div>
      {windowSize.width > 576 ? (
        <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
          <div className={style.QuestionsRemainBlockContainer}>
            <div className={style.QuestionsRemainBlockText}>
              <BlockTitle className={style.h2} value={'' + formatMessage({ id: 'questionsRemainBlock.headline' })} />
              <div className={style.text}>{formatMessage({ id: 'questionsRemainBlock.text' })}</div>
            </div>
            <div className={style.QuestionsRemainBlockButton}>
              <AppButton color={'primary'}>{formatMessage({ id: 'button.go.over' })}</AppButton>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.QuestionsRemainBlockContainer}>
            <div className={style.QuestionsRemainBlockText}>
              <BlockTitle className={style.h2} value={'' + formatMessage({ id: 'questionsRemainBlock.headline' })} />
              <div className={style.text}>{formatMessage({ id: 'questionsRemainBlock.text' })}</div>
            </div>
            <div className={style.QuestionsRemainBlockButton}>
              <AppButton color={'primary'}>{formatMessage({ id: 'button.go.over' })}</AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsRemainBlock;
