import style from './EarningInfoBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import imgHeadline from '../../../../../public/imgHeadline.png';

const EarningInfoBlock = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.earningInfoBlockContainer}>
        <div className={style.earningInfoBlockText}>
          <BlockTitle value={'Заработок на растущем и падающем рынке'} />
          <div className={style.text}>
            Куда бы не пошёл рынок, вверх или вниз, всегда есть арбитражные ситуации, на которых можно зарабатывать.
          </div>
        </div>
        <div className={style.earningInfoBlockImg}>
          <img src={imgHeadline} />
        </div>
      </div>
    </div>
  );
};

export default EarningInfoBlock;
