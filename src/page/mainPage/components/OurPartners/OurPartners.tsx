import style from './OurPartners.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import AppTooltip from '../../../../components/toollip/AppTooltip.tsx';
import Binance from '../../../../../public/mainPage/ourPartners/Binance.svg';
import OKX from '../../../../../public/mainPage/ourPartners/OKX.svg';
import Bybit from '../../../../../public/mainPage/ourPartners/Bybit.svg';
import KUCOIN from '../../../../../public/mainPage/ourPartners/KUCOIN.svg';
import Bitget from '../../../../../public/mainPage/ourPartners/Bitget.svg';
import MEXC from '../../../../../public/mainPage/ourPartners/MEXC.svg';
import huobi from '../../../../../public/mainPage/ourPartners/huobi.svg';
import gateIO from '../../../../../public/mainPage/ourPartners/gateIO.svg';
import Bitmart from '../../../../../public/mainPage/ourPartners/Bitmart.svg';
import Poloniex from '../../../../../public/mainPage/ourPartners/Poloniex.svg';

const OurPartners = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.ourPartnersHeadline}>
        <BlockTitle value={'Наши партнеры'} />
        <AppTooltip title={'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem'} placement={'top'} />
      </div>
      <div className={style.OurPartnersContainer}>
        <div className={style.OurPartnersContainerImg}>
          <img src={Binance} alt={'BinanceLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={OKX} alt={'OKXLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={Bybit} alt={'BybitLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={KUCOIN} alt={'KUCOINLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={Bitget} alt={'BitgetLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={MEXC} alt={'MEXCLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={huobi} alt={'huobiLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={gateIO} alt={'gateIOLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={Bitmart} alt={'BitmartLogo'} />
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={Poloniex} alt={'PoloniexLogo'} />
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
