import style from './OurPartners.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";
import BlockTitle from "../BlockTitles/BlockTitle";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { styled } from "@mui/material";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#252525',
    padding: 12,
    fontSize: 16,
  },
}));

const OurPartners = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <div className={style.ourPartnersHeadline}>
        <BlockTitle value={"Наши партнеры"}/>
        <BootstrapTooltip title="Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem" placement="top">
          <img src={'src/page/mainPage/components/OurPartners/imgInfo/Info.svg'}/>
        </BootstrapTooltip>
      </div>
      <div className={style.OurPartnersContainer}>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Binance.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/OKX.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bybit.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/KUCOIN.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitget.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/MEXC.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/huobi.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/gateIO.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Bitmart.svg'}/>
        </div>
        <div className={style.OurPartnersContainerImg}>
          <img src={'src/page/mainPage/components/OurPartners/logoPartnersImg/Poloniex.svg'}/>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;