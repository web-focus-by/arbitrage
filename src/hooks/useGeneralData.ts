import { useAppSelector } from '../store/hooks.ts';
import { selectAllMarkets } from '../features/general/generalSelect.ts';
import { useMemo } from 'react';

const useGeneralData = () => {
  const markets = useAppSelector(selectAllMarkets);

  const marketsDictionary = useMemo(() => {
    return markets.reduce((acc, item) => {
      acc[item.market] = item.name;
      return acc;
    }, {} as { [key: string]: string });
  }, [markets]);

  return { markets, marketsDictionary };
};

export default useGeneralData;
