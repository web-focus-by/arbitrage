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
import { useIntl } from 'react-intl';

const dataPartners = [
  {
    id: 1,
    src: Binance,
    alt: 'Binance',
  },
  {
    id: 2,
    src: OKX,
    alt: 'OKX',
  },
  {
    id: 3,
    src: Bybit,
    alt: 'Bybit',
  },
  {
    id: 4,
    src: KUCOIN,
    alt: 'KUCOIN',
  },
  {
    id: 5,
    src: Bitget,
    alt: 'Bitget',
  },
  {
    id: 6,
    src: MEXC,
    alt: 'MEXC',
  },
  {
    id: 7,
    src: huobi,
    alt: 'huobi',
  },
  {
    id: 8,
    src: gateIO,
    alt: 'gateIO',
  },
  {
    id: 9,
    src: Bitmart,
    alt: 'Bitmart',
  },
  {
    id: 10,
    src: Poloniex,
    alt: 'Poloniex',
  },
];

const OurPartners = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)} id={'Партнеры'}>
      <div className={style.ourPartnersHeadline}>
        <BlockTitle value={'' + formatMessage({ id: 'ourPartners.headline' })} />
        <AppTooltip title={'' + formatMessage({ id: 'ourPartners.tooltip' })} placement={'top'} />
      </div>
      <div className={style.OurPartnersContainer}>
        {dataPartners.map((item) => (
          <div key={item.id} className={style.OurPartnersContainerImg}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPartners;
