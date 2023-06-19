import { ITableContent } from '../../../page/dashboard/components/table/TableDashboard.tsx';
import { TMarket } from '../../../services/generalInfo.ts';

export const getFormattedSpreadString = (spread: ITableContent, marketData: TMarket[] = []) => {
  const { ask_market, bid_market, profit_spread, percent_spread, ask_volume } = spread;
  const ask_market_data = marketData.find((market) => market.market === ask_market)?.name;
  const bid_market_data = marketData.find((market) => market.market === bid_market)?.name;
  return `${ask_volume} + ${profit_spread}$ (${percent_spread}%), ${ask_market_data ?? ask_market} -> ${
    bid_market_data ?? bid_market
  }`;
};
