import style from './OurPartners.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import AppTooltip from '../../../../components/toollip/AppTooltip.tsx';

const OurPartners = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.ourPartnersHeadline}>
        <BlockTitle value={'Наши партнеры'} />
        <AppTooltip title={'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem'} placement={'top'} />
      </div>
      <div className={style.OurPartnersContainer}>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Binance.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/OKX.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bybit.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/KUCOIN.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitget.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/MEXC.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/huobi.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/gateIO.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitmart.svg'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Poloniex.svg'} />
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
