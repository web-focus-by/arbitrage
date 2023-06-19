import style from './EarningInfoBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import { useIntl } from 'react-intl';
import imgHeadline from '../../../../../public/imgHeadline.png';

const EarningInfoBlock = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.earningInfoBlockContainer}>
        <div className={style.earningInfoBlockText}>
          <BlockTitle value={'' + formatMessage({ id: 'earningInfoBlock.headline' })} />
          <div className={style.text}>{formatMessage({ id: 'earningInfoBlock.text' })}</div>
        </div>
        <div className={style.earningInfoBlockImg}>
          <img src={imgHeadline} />
        </div>
      </div>
    </div>
  );
};

export default EarningInfoBlock;
