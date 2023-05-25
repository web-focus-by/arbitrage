import style from './AdvantagesBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";
import { useIntl } from "react-intl";
import ImgLinksBetweenExchanges from "../../img/advantages/ImgLinksBetweenExchanges";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SearchIcon from '@mui/icons-material/Search';
import ImgConvenientFilters from "../../img/advantages/ImgConvenientFilters";
import ImgCalcTransactionAmount from "../../img/advantages/ImgCalcTransactionAmount";
import ImgCommissionAccounting from "../../img/advantages/ImgCommissionAccountong";
import ImgHedging from "../../img/advantages/ImgHedging";
import ImgSpreadAlerts from "../../img/advantages/ImgSpreadAlerts";
import ImgCoinTransferTime from "../../img/advantages/ImgCoinTransferTime";

const dataAdvantages = [
  {id: 1, adv_headline: 'advHeadline.links.between.exchanges',
    adv_descr: 'advDescr.links.between.exchanges', adv_img: <ImgLinksBetweenExchanges viewBox='0 0 32 32' sx={{fill:'none', fontSize: 32}}/>},

  {id: 2, adv_headline: 'advHeadline.convenient.filters',
    adv_descr: 'advDescr.convenient.filters', adv_img: <ImgConvenientFilters viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>},

  {id: 3, adv_headline: 'advHeadline.quick.update.spreads',
    adv_descr: 'advDescr.quick.update.spreads', adv_img: <QueryBuilderIcon sx={{fontSize: 32, color: '#3366CC'}}/>},

  {id: 4, adv_headline: 'advHeadline.calc.transaction.amount',
    adv_descr: 'advDescr.calc.transaction.amount', adv_img: <ImgCalcTransactionAmount viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>},

  {id: 5, adv_headline: 'advHeadline.check.output.networks',
    adv_descr: 'advDescr.check.output.networks', adv_img: <SearchIcon sx={{fontSize: 32, color: '#3366CC'}}/>},

  {id: 6, adv_headline: 'advHeadline.commission.accounting',
    adv_descr: 'advDescr.commission.accounting', adv_img: <ImgCommissionAccounting viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>},

  {id: 7, adv_headline: 'advHeadline.hedging',
    adv_descr: 'advDescr.hedging', adv_img: <ImgHedging viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>},

  {id: 8, adv_headline: 'advHeadline.spread.alerts',
    adv_descr: 'advDescr.spread.alerts', adv_img: <ImgSpreadAlerts viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>},

  {id: 9, adv_headline: 'advHeadline.coin.transfer.time',
    adv_descr: 'advDescr.coin.transfer.time', adv_img: <ImgCoinTransferTime viewBox='0 0 32 32' sx={{fill:'none', fontSize:32}}/>}
]


const AdvantagesBlock = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <BlockTitle value={"Преимущества"}/>
      <div className={style.advantages_container}>
        {dataAdvantages.map((item) => (
          <div key={item.id} className={style.advantage_block}>
            <div className={style.advantage_block_text}>
              <div>
                {formatMessage({id: item.adv_headline})}
              </div>
              <div>
                {formatMessage({id: item.adv_descr})}
              </div>
            </div>
            <div>
              {item.adv_img}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesBlock;