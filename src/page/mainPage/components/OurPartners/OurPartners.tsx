import style from './OurPartners.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import AppTooltip from '../../../../components/toollip/AppTooltip.tsx';
import useTheme from '../../../../hooks/useTheme';
import BinanceLight from '../../../../../public/mainPage/ourPartners/lightTheme/Binance.svg';
import OKXLight from '../../../../../public/mainPage/ourPartners/lightTheme/OKX.svg';
import BybitLight from '../../../../../public/mainPage/ourPartners/lightTheme/Bybit.svg';
import KUCOINLight from '../../../../../public/mainPage/ourPartners/lightTheme/KUCOIN.svg';
import BitgetLight from '../../../../../public/mainPage/ourPartners/lightTheme/Bitget.svg';
import MEXCLight from '../../../../../public/mainPage/ourPartners/lightTheme/MEXC.svg';
import huobiLight from '../../../../../public/mainPage/ourPartners/lightTheme/huobi.svg';
import gateIOLight from '../../../../../public/mainPage/ourPartners/lightTheme/GateIO.svg';
import BitmartLight from '../../../../../public/mainPage/ourPartners/lightTheme/Bitmart.svg';
import PoloniexLight from '../../../../../public/mainPage/ourPartners/lightTheme/Poloniex.svg';
import BinanceDark from '../../../../../public/mainPage/ourPartners/darkTheme/Binance.svg';
import OKXDark from '../../../../../public/mainPage/ourPartners/darkTheme/OKX.svg';
import BybitDark from '../../../../../public/mainPage/ourPartners/darkTheme/Bybit.svg';
import KUCOINDark from '../../../../../public/mainPage/ourPartners/darkTheme/KUCOIN.svg';
import BitgetDark from '../../../../../public/mainPage/ourPartners/darkTheme/Bitget.svg';
import MEXCDark from '../../../../../public/mainPage/ourPartners/darkTheme/MEXC.svg';
import huobiDark from '../../../../../public/mainPage/ourPartners/darkTheme/huobi.svg';
import gateIODark from '../../../../../public/mainPage/ourPartners/darkTheme/GateIO.svg';
import BitmartDark from '../../../../../public/mainPage/ourPartners/darkTheme/Bitmart.svg';
import PoloniexDark from '../../../../../public/mainPage/ourPartners/darkTheme/Poloniex.svg';
import { useIntl } from 'react-intl';

const dataPartnersLight = [
  {
    id: 1,
    src: BinanceLight,
    alt: 'Binance',
  },
  {
    id: 2,
    src: OKXLight,
    alt: 'OKX',
  },
  {
    id: 3,
    src: BybitLight,
    alt: 'Bybit',
  },
  {
    id: 4,
    src: KUCOINLight,
    alt: 'KUCOIN',
  },
  {
    id: 5,
    src: BitgetLight,
    alt: 'Bitget',
  },
  {
    id: 6,
    src: MEXCLight,
    alt: 'MEXC',
  },
  {
    id: 7,
    src: huobiLight,
    alt: 'huobi',
  },
  {
    id: 8,
    src: gateIOLight,
    alt: 'gateIO',
  },
  {
    id: 9,
    src: BitmartLight,
    alt: 'Bitmart',
  },
  {
    id: 10,
    src: PoloniexLight,
    alt: 'Poloniex',
  },
];

const dataPartnersDark = [
  {
    id: 1,
    src: BinanceDark,
    alt: 'Binance',
  },
  {
    id: 2,
    src: OKXDark,
    alt: 'OKX',
  },
  {
    id: 3,
    src: BybitDark,
    alt: 'Bybit',
  },
  {
    id: 4,
    src: KUCOINDark,
    alt: 'KUCOIN',
  },
  {
    id: 5,
    src: BitgetDark,
    alt: 'Bitget',
  },
  {
    id: 6,
    src: MEXCDark,
    alt: 'MEXC',
  },
  {
    id: 7,
    src: huobiDark,
    alt: 'huobi',
  },
  {
    id: 8,
    src: gateIODark,
    alt: 'gateIO',
  },
  {
    id: 9,
    src: BitmartDark,
    alt: 'Bitmart',
  },
  {
    id: 10,
    src: PoloniexDark,
    alt: 'Poloniex',
  },
];

const OurPartners = () => {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)} id={'partners'}>
      <div className={style.ourPartnersHeadline}>
        <BlockTitle value={'' + formatMessage({ id: 'ourPartners.headline' })} />
        <AppTooltip title={'' + formatMessage({ id: 'ourPartners.tooltip' })} placement={'top'} />
      </div>
      <div className={style.OurPartnersContainer}>
        {theme == 'light'
          ? dataPartnersLight.map((item) => (
              <div key={item.id} className={style.OurPartnersContainerImg}>
                <img src={item.src} alt={item.alt} />
              </div>
            ))
          : dataPartnersDark.map((item) => (
              <div key={item.id} className={style.OurPartnersContainerImg}>
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default OurPartners;
