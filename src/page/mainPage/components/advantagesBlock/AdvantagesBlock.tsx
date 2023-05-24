import style from './AdvantagesBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";
import { useIntl } from "react-intl";


const dataAdvantages = [
  {id: 1, adv_headline: 'advHeadline.links.between.exchanges',
    adv_descr: 'advDescr.links.between.exchanges', adv_img: ''},

  {id: 2, adv_headline: 'advHeadline.convenient.filters',
    adv_descr: 'advDescr.convenient.filters', adv_img: ''},

  {id: 3, adv_headline: 'advHeadline.quick.update.spreads',
    adv_descr: 'advDescr.quick.update.spreads', adv_img: ''},

  {id: 4, adv_headline: 'advHeadline.calc.transaction.amount',
    adv_descr: 'advDescr.quick.calc.transaction.amount', adv_img: ''},

  {id: 5, adv_headline: 'advHeadline.check.output.networks',
    adv_descr: 'advDescr.check.output.networks', adv_img: ''},

  {id: 6, adv_headline: 'advHeadline.commission.accounting',
    adv_descr: 'advDescr.commission.accounting', adv_img: ''},

  {id: 7, adv_headline: 'advHeadline.hedging',
    adv_descr: 'advDescr.quick.hedging', adv_img: ''},

  {id: 8, adv_headline: 'advHeadline.spread.alerts',
    adv_descr: 'advDescr.spread.alerts', adv_img: ''},

  {id: 9, adv_headline: 'advHeadline.coin.transfer.time',
    adv_descr: 'advDescr.coin.transfer.time', adv_img: ''}
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
            <div className={style.advantage_img}>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesBlock;