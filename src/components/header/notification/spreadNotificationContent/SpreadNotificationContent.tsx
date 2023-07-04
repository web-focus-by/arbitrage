import { ITableContent } from '../../../../page/dashboard/components/table/TableDashboard.tsx';
import style from './spreadNotificationContent.module.scss';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../../store/hooks.ts';
import { selectAllMarkets } from '../../../../features/general/generalSelect.ts';

const SpreadNotificationContent = ({ data }: { data: ITableContent }) => {
  const { formatMessage } = useIntl();
  const markets = useAppSelector(selectAllMarkets);

  const transformedData = useMemo(() => {
    const {
      ask_market,
      bid_market,
      withdraw_time_text,
      avg_ask_price,
      ask_limits_start,
      ask_limits_end,
      ask_volume,
      ask_monets_volume,
      ask_index,
      avg_bid_price,
      bid_limits_start,
      bid_limits_end,
      bid_volume,
      bid_monets_volume,
      bid_index,
      ask_spot_fee,
      bid_spot_fee,
      withdraw_fee_usdt,
      network,
      profit_spread,
      percent_spread,
    } = data;
    const askMarket = markets.find((market) => market.market === ask_market)?.name ?? ask_market;
    const bidMarket = markets.find((market) => market.market === bid_market)?.name ?? bid_market;
    return [
      { title: 'buy', content: askMarket },
      { title: 'cost', content: `${avg_ask_price}` + (ask_index > 1 ? `[${ask_limits_start}-${ask_limits_end}]` : '') },
      {
        title: 'value',
        content: [
          ask_volume + '$',
          ask_monets_volume,
          formatMessage({ id: 'notification.modal.table.content.order.value' }, { val: ask_index }),
        ].join(', '),
      },
      { title: 'sell', content: bidMarket },
      { title: 'cost', content: `${avg_bid_price}` + (bid_index > 1 ? `[${bid_limits_start}-${bid_limits_end}]` : '') },
      {
        title: 'value',
        content: [
          bid_volume + '$',
          bid_monets_volume,
          formatMessage({ id: 'notification.modal.table.content.order.value' }, { val: bid_index }),
        ].join(', '),
      },
      { title: 'fee.spot', content: Number(ask_spot_fee) + Number(bid_spot_fee) + '$' },
      { title: 'fee.network', content: `${withdraw_fee_usdt}$ (${network})` },
      { title: 'pure.spread', content: `${profit_spread}$ (${percent_spread}%)` },
      { title: 'time', content: withdraw_time_text },
    ];
  }, [data, formatMessage, markets]);

  return (
    <div className={style.spreadNotificationContent}>
      <div className={style.spreadNotificationContentItem}>
        <div className={classNames(style.spreadNotificationContentItemTitle, 'subtitle3')}>
          {data.base_coin}/{data.quote_coin}:
        </div>
      </div>
      {transformedData.map((item, index) => {
        return (
          <div key={index + item.title} className={classNames(style.spreadNotificationContentItem)}>
            <div className={classNames(style.spreadNotificationContentItemTitle, 'subtitle3')}>
              {formatMessage({ id: 'notification.modal.table.title.' + item.title })}
            </div>
            <div className={style.divider}></div>
            <div className={classNames(style.spreadNotificationContentItemTitle, 'content')}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SpreadNotificationContent;
