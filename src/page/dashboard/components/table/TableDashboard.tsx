import style from './TableDashboard.module.scss';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import mockDataTable from './tableDashboard.mock.json';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import AppTableCell from '../../../../components/table/сell/AppTableCell.tsx';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import { useGetMessagesQuery } from '../../../../services/table.ts';
import { useEffect } from 'react';

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

// interface ITableContent {
//   ask_market: 'string';
//   bid_market: 'string';
//   profit_spread: 'string';
//   percent_spread: 'string';
//   ask_volume: 'string';
//   bid_volume: 'string';
//   avg_ask_price: 'string';
//   avg_bid_price: 'string';
//   volume: 'string';
//   withdraw_fee: 'string';
//   ask_spot_fee: 'string';
//   bid_spot_fee: 'string';
//   network: 'string';
//   ask_index: number;
//   bid_index: number;
//   hedge: number;
// }

interface ITableContent {
  monet: string;
  ask_market: string;
  bid_market: string;
  profit_spread: string;
  percent_spread: string;
  ask_volume: string;
  bid_volume: string;
  avg_ask_price: string;
  avg_bid_price: string;
  volume: string;
  withdraw_fee: string;
  ask_spot_fee: string;
  bid_spot_fee: string;
  network: string;
  ask_index: number;
  bid_index: number;
  hedge: boolean;
}

type THeadTableItems = {
  name: string;
  tooltip?: string;
};
const headTableItems: THeadTableItems[] = [
  {
    name: 'currency',
  },
  {
    name: 'volume',
  },
  {
    name: 'profit',
  },
  {
    name: 'spread',
  },
  {
    name: 'exchanges',
  },
  {
    name: 'price',
  },
  {
    name: 'range',
  },
  {
    name: 'orders',
  },
  {
    name: 'fee.spot',
  },
  {
    name: 'network',
  },
  {
    name: 'fee.network',
  },
  {
    name: 'time',
  },
  {
    name: 'hedge',
  },
];

const TableDashboard = () => {
  const data1: ITableContent[] = mockDataTable;
  const { formatMessage } = useIntl();
  const { data, ...other } = useGetMessagesQuery();

  useEffect(() => {
    console.log({ data, other });
  }, [data, other]);

  return (
    <div className={style.wrapper}>
      <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.result.subtitle' })}</div>
      <div className={classNames(style.tableWrapper)}>
        {data1.length > 0 ? (
          <TableContainer component={Paper} classes={{ root: style.tableContainer }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" classes={{ root: style.table }}>
              <TableHead>
                <TableRow>
                  {headTableItems.map((item, index) => (
                    <AppTableCell key={item.name + index}>
                      {formatMessage({ id: 'dashboard.table.head.' + item.name })}
                    </AppTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data1.map((row, index) => (
                  <TableRow key={row.monet + index}>
                    <AppTableCell>{row.monet}</AppTableCell>
                    <AppTableCell>${row.volume}</AppTableCell>
                    <AppTableCell>${row.profit_spread}</AppTableCell>
                    <AppTableCell>{row.percent_spread}%</AppTableCell>
                    <AppTableCell>
                      <div>{row.ask_market}</div>
                      <div>{row.bid_market}</div>
                    </AppTableCell>
                    <AppTableCell>
                      <div>{row.ask_volume}</div>
                      <div>{row.bid_volume}</div>
                    </AppTableCell>
                    <AppTableCell></AppTableCell>
                    <AppTableCell>
                      <div>{row.ask_index}</div>
                      <div>{row.bid_index}</div>
                    </AppTableCell>
                    <AppTableCell>
                      <div>${row.ask_spot_fee}</div>
                      <div>${row.bid_spot_fee}</div>
                    </AppTableCell>
                    <AppTableCell>{row.network}</AppTableCell>
                    <AppTableCell>{row.withdraw_fee}</AppTableCell>
                    <AppTableCell>
                      <div>5-15 мин</div>
                    </AppTableCell>
                    <AppTableCell>
                      <AppCheckbox
                        formControlLabelProps={{ classes: { root: style.resetMarginRight } }}
                        checkboxProps={{ value: row.hedge, classes: { root: style.resetPadding } }}
                      />
                    </AppTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
