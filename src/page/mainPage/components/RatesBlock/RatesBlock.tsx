import style from './RatesBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";
import { useIntl } from "react-intl";
import AppButton from "../../../../components/button/AppButton";
import CheckIcon from '@mui/icons-material/Check';


const dataRates = [
  {id: 1, ratesTerm: 'ratesBlock.term.week',
    ratesPrice: 'ratesBlock.price.week', ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat', ratesContentIntraExchangeTgBot: ''},

  {id: 2, ratesTerm: 'ratesBlock.term.month',
    ratesPrice: 'ratesBlock.price.month', ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat', ratesContentIntraExchangeTgBot: 'ratesBlock.content.intra.exchange.tg.bot'},

  {id: 3, ratesTerm: 'ratesBlock.term.forever',
    ratesPrice: 'ratesBlock.price.forever', ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat', ratesContentIntraExchangeTgBot: 'ratesBlock.content.intra.exchange.tg.bot'}
]

const RatesBlock = () => {
  const { formatMessage } = useIntl();
  return(
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
      <BlockTitle value={"Тарифы"}/>
      <div className={style.ratesBlockContainer}>
          {dataRates.map((item) => (
            <div key={item.id} className={style.ratesBlockItem}>
                <h4 className={style.ratesTerm}>
                  {formatMessage({id: item.ratesTerm})}
                </h4>
                <div className={style.ratesBlockItemContent}>
                  <div>
                    <div className={classNames(style.ratesPrice, style.prise)}>
                      {formatMessage({id: item.ratesPrice})}
                    </div>
                    <div className={classNames(style.ratesContentText, style.text)}>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{color: '#3366CC'}}/>
                        {formatMessage({id: item.ratesContentInterExchangeScanner})}
                      </div>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{color: '#3366CC'}}/>
                        {formatMessage({id: item.ratesContentInterExchangeTgBot})}
                      </div>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{color: '#3366CC'}}/>
                        {formatMessage({id: item.ratesContentUserChat})}
                      </div>
                      {item.ratesContentIntraExchangeTgBot && <div className={style.ratesContent}>
                        <CheckIcon sx={{color: '#3366CC'}}/>
                        {formatMessage({id: item.ratesContentIntraExchangeTgBot})}
                      </div>}
                    </div>
                  </div>

                  <AppButton color={'secondary'}>Приобрести</AppButton>
                </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default RatesBlock;