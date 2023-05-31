import style from './TableDashboard.module.scss';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

// ask_market:
// description: Биржа покупки
// bid_market:
// description: Биржа продажи
// profit_spread:
// description: Прибыль в долларах
// percent_spread:
// description: Прибыль в процентах
// ask_volume:
// description: Сумма покупки
// bid_volume:
// description: Сумма продажи
// avg_ask_price:
// description: Средняя цена покупки
// avg_bid_price:
// description: Средняя цена продажи
// volume:
// description: Количество монет к покупке
// withdraw_fee:
// description: Комиссия сети в монетах
// ask_spot_fee:
// description: Комиссия спота на бирже покупки в долларах
// bid_spot_fee:
// description: Комиссия спота на бирже продажи в долларах
// network:
// description: Сеть перевода
// ask_index:
// description: Количество ордеров для покупки
// bid_index:
// description: Количество ордеров для продажи
// hedge:
// description: 0 - нет хеджа, 1 - есть хедж

interface ITableConte {
  ask_market: 'string';
  bid_market: 'string';
  profit_spread: 'string';
  percent_spread: 'string';
  ask_volume: 'string';
  bid_volume: 'string';
  avg_ask_price: 'string';
  avg_bid_price: 'string';
  volume: 'string';
  withdraw_fee: 'string';
  ask_spot_fee: 'string';
  bid_spot_fee: 'string';
  network: 'string';
  ask_index: number;
  bid_index: number;
  hedge: number;
}
const TableDashboard = () => {
  const data: ITableConte[] = [];
  const { formatMessage } = useIntl();

  return (
    <div className={style.wrapper}>
      <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.result.subtitle' })}</div>
      <div className={classNames(style.tableWrapper)}>
        {data.length > 0 ? (
          'asd'
        ) : (
          <div className={classNames('subtitle3', style.textCenter)}>
            {formatMessage({ id: 'dashboard.table.err.empty' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDashboard;
