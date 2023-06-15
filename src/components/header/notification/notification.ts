import { ITableContent } from '../../../page/dashboard/components/table/TableDashboard.tsx';

export const getFormattedSpreadString = (spread: ITableContent) => {
  const { ask_market, bid_market, profit_spread, percent_spread, ask_monets_volume } = spread;
  return `${ask_monets_volume} + ${profit_spread}$ (${percent_spread}%), ${ask_market} -> ${bid_market}`;
};
