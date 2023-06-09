import React, { useEffect, useRef, useState } from 'react';
import style from './TableDashboard.module.scss';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
// import mockDataTable from './tableDashboard.mock.json';
import {
  Collapse,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  tableClasses,
} from '@mui/material';
import AppTableCell from '../../../../components/table/сell/AppTableCell.tsx';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useWindow from '../../../../hooks/useWindow.ts';
import { useGetMessagesQuery } from '../../../../services/table.ts';

export interface ITableContent {
  base_coin: string;
  quote_coin: string;
  ask_market: string;
  ask_url: string;
  bid_market: string;
  bid_url: string;
  profit_spread: string;
  percent_spread: string;
  ask_volume: string;
  bid_volume: string;
  avg_ask_price: string;
  avg_bid_price: string;
  ask_monets_volume: string;
  bid_monets_volume: string;
  withdraw_fee: string;
  withdraw_fee_usdt: string;
  ask_spot_fee: string;
  bid_spot_fee: string;
  network: string;
  ask_index: number;
  ask_limits_start: string;
  ask_limits_end: string;
  bid_limits_start?: string;
  bid_limits_end?: string;
  bid_index: number;
  hedge: boolean;
  withdraw_time_category?: number;
  withdraw_time_text?: string;
  icon: string;
}

type THeadTableItems = {
  name: string;
  tooltip?: string;
};
type TTransformedTableItems = {
  [key: string]: ITableContent[];
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
  // const data: ITableContent[] = mockDataTable;
  const { windowSize } = useWindow();
  const { formatMessage } = useIntl();
  const tableHead: React.MutableRefObject<HTMLTableRowElement | null> = useRef(null);
  const { data, ...other } = useGetMessagesQuery();
  const [tableHeadWidth, setTableHeadWidth] = useState([] as number[]);

  const updateTableHeadWidth = () => {
    if (tableHead.current) {
      const newTableHeadWidth = Array.from(tableHead.current.children as HTMLCollectionOf<HTMLHeadElement>).map(
        (item) => {
          return item.scrollWidth;
        },
      );
      setTableHeadWidth(newTableHeadWidth);
    }
  };

  useEffect(() => {
    updateTableHeadWidth();
  }, [tableHead, windowSize.width, data]);

  useEffect(() => {
    console.log({ other });
  }, [other]);

  return (
    <div className={style.wrapper}>
      <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.result.subtitle' })}</div>
      <div className={classNames(style.tableWrapper)}>
        {data && data.length > 0 ? (
          <TableContainer component={Paper} classes={{ root: style.tableContainer }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized collapsible table" classes={{ root: style.table }}>
              <TableHead>
                <TableRow ref={tableHead}>
                  {headTableItems.map((item, index) => (
                    <AppTableCell key={item.name + index}>
                      {formatMessage({ id: 'dashboard.table.head.' + item.name })}
                    </AppTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(transformData(data)).map(([baseCoin, tableContent], coinIndex) => {
                  return (
                    <NestedRow
                      item={tableContent}
                      name={baseCoin}
                      key={baseCoin + coinIndex}
                      headerWidthData={tableHeadWidth}
                      updateTableHeadWidth={updateTableHeadWidth}
                    />
                  );
                })}
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

const NestedRow = ({
  item,
  name,
  headerWidthData,
  updateTableHeadWidth,
}: {
  item: ITableContent[];
  name: string;
  headerWidthData: number[];
  updateTableHeadWidth: () => void;
}) => {
  const isNested = item.length > 1;
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpened(!isOpened);
  };

  if (!isNested) {
    return (
      <Row
        row={item[0]}
        index={0}
        baseName={name}
        itemLength={item.length}
        updateTableHeadWidth={updateTableHeadWidth}
      />
    );
  }
  return (
    <React.Fragment>
      <Row
        row={item[0]}
        index={0}
        baseName={name}
        openHandler={openHandler}
        itemLength={item.length}
        isOpen={isOpened}
        updateTableHeadWidth={updateTableHeadWidth}
      />
      <TableRow>
        <AppTableCell style={{ padding: 0, border: 'none' }} colSpan={headTableItems.length}>
          <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <Table
              sx={{
                [`.${tableClasses.root}`]: {
                  border: 'none',
                },
              }}
            >
              <TableBody>
                {item.map((row, index) => {
                  return (
                    <Row
                      row={row}
                      index={index + 1}
                      baseName={''}
                      key={name + 'additional_row' + index}
                      isOpen={isOpened}
                      tdWidth={headerWidthData}
                      itemLength={item.length}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </AppTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const Row = ({
  row,
  index,
  baseName,
  openHandler,
  tdWidth,
  itemLength = 1,
  isOpen = false,
  updateTableHeadWidth,
}: {
  row: ITableContent;
  index: number;
  baseName: string;
  openHandler?: () => void;
  isOpen?: boolean;
  tdWidth?: number[];
  itemLength?: number;
  updateTableHeadWidth?: () => void;
}) => {
  const { formatMessage } = useIntl();
  // console.log('tdWidth', tdWidth);
  const isHaveTopAndBotBorder = itemLength >= 1 && index === 0;

  return (
    <TableRow key={row.base_coin + index}>
      <AppTableCell
        sx={{
          width: tdWidth ? tdWidth[0] : 'unset',
        }}
        classes={{
          body: classNames({ [style.resetTopAndBottomBorder]: !isHaveTopAndBotBorder, [style.tableCell]: true }),
        }}
      >
        {baseName && itemLength ? (
          <div className={style.baseCoinWrapper} onClick={openHandler}>
            <img
              src={row.icon}
              alt={'logo'}
              style={{ maxHeight: 32, maxWidth: 32 }}
              onLoad={() => {
                if (updateTableHeadWidth) {
                  updateTableHeadWidth();
                }
              }}
            />
            <div className={style.baseCoin}>
              <span>{baseName}</span>

              {itemLength > 1 ? (
                <div onClick={openHandler} className={classNames(style.baseCoinOpenText, 'text2')}>
                  {formatMessage({ id: 'dashboard.table.multiline.spread.text' }, { count: itemLength })}
                  {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[1] : 'unset' }}>${row.ask_monets_volume}</AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[2] : 'unset' }}>${row.profit_spread}</AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[3] : 'unset' }}>{row.percent_spread}%</AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[4] : 'unset' }}>
        <div>
          <a href={row.ask_url.replace(/"/g, '')} target={'_blank'}>
            {row.ask_market}
          </a>
        </div>
        <div>
          <a href={row.bid_url.replace(/"/g, '')} target={'_blank'}>
            {row.bid_market}
          </a>
        </div>
      </AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[5] : 'unset' }}>
        <div>{row.ask_volume}</div>
        <div>{row.bid_volume}</div>
      </AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[6] : 'unset' }}>
        <div>
          {row.ask_limits_start} - {row.ask_limits_end}
        </div>
        <div>
          {row.bid_limits_start} - {row.bid_limits_end}
        </div>
      </AppTableCell>
      <AppTableCell style={{ width: tdWidth ? tdWidth[7] : 'unset' }}>
        <div>{row.ask_index}</div>
        <div>{row.bid_index}</div>
      </AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[8] : 'unset' }}>
        <div>${row.ask_spot_fee}</div>
        <div>${row.bid_spot_fee}</div>
      </AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[9] : 'unset' }}>{row.network}</AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[10] : 'unset' }}>{row.withdraw_fee}</AppTableCell>
      <AppTableCell sx={{ width: tdWidth ? tdWidth[11] : 'unset' }}>
        <div>{row.withdraw_time_text}</div>
      </AppTableCell>
      <AppTableCell
        sx={{
          width: tdWidth ? tdWidth[12] : 'unset',
          [`.${tableCellClasses.root}`]: {
            borderRight: 'none',
          },
        }}
      >
        <AppCheckbox
          formControlLabelProps={{ classes: { root: style.resetMarginRight } }}
          checkboxProps={{ value: row.hedge, classes: { root: style.resetPadding } }}
        />
      </AppTableCell>
    </TableRow>
  );
};
const transformData = (data: ITableContent[]): TTransformedTableItems => {
  return data.reduce((acc, item) => {
    if (Object.prototype.hasOwnProperty.call(acc, item.base_coin)) {
      return { ...acc, [item.base_coin]: [...acc[item.base_coin], item] };
    } else {
      return { ...acc, [item.base_coin]: [item] };
    }
  }, {} as TTransformedTableItems);
};

export default TableDashboard;
