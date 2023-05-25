import style from './OurPartners.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";
import BlockTitle from "../BlockTitles/BlockTitle";

const OurPartners = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <BlockTitle value={"Наши партнеры"}/>
      <div className={style.OurPartnersContainer}>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Binance.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/OKX.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bybit.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/KUCOIN.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitget.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/MEXC.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/huobi.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/gateIO.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitmart.svg'}/>
        <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Poloniex.svg'}/>
      </div>
    </div>
  );
};

export default OurPartners;