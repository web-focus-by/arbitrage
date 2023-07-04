import { UseFormGetValues } from 'react-hook-form';
import { IUser } from '../../../../services/auth.ts';
import { lazy, number, string } from 'yup';
import * as yup from 'yup';
import { TAppAutocompleteOptions } from '../../../../components/autocomplete/AppAutocomplete.tsx';

export interface IFilterSelect {
  [key: string]: boolean | number | string | string[] | TAppAutocompleteOptions[] | IFilterSelect;
}

export enum CheckboxGroup {
  buy = 'buy',
  sell = 'sell',
}

export enum CheckboxAll {
  buy = 'buyAll',
  sell = 'sellAll',
}

export interface ICheckboxHandler {
  (
    value: IFilterSelect,
    setIndeterminateHandler: (value: boolean) => void,
    getValues: UseFormGetValues<IFilterSelect>,
    setValue: (name: string, value: boolean) => void,
    checkboxType: CheckboxGroup,
    checkboxAll: CheckboxAll,
  ): void;
}

export const checkboxesHandler: ICheckboxHandler = (
  value,
  setIndeterminateHandler,
  getValues,
  setValue,
  checkboxType,
  checkboxAll,
) => {
  if (!value[checkboxType]) return;
  const isSomeSelected = Object.entries(value[checkboxType]).some((el) => {
    if (el[1] === true) {
      setIndeterminateHandler(true);
      return true;
    }
    return false;
  });
  const isAllSelected = Object.entries(value[checkboxType]).every((el) => {
    return el[1] === true;
  });

  if (isAllSelected) {
    if (!getValues(checkboxAll) || getValues(checkboxAll) === undefined) {
      setValue(checkboxAll, true);
    }
  } else {
    if (getValues(checkboxAll)) {
      setValue(checkboxAll, false);
    }
  }

  if (!isSomeSelected) setIndeterminateHandler(false);
};

export const getDefaultFormData = (user: IUser, markets: string[]) => {
  return {
    buy: markets.reduce((acc, val) => ({ ...acc, [val]: user?.markets_buy.includes(val) }), {}),
    sell: markets.reduce((acc, val) => ({ ...acc, [val]: user?.markets_sell.includes(val) }), {}),
    blackListNetwork: [],
    blackListCoins: [],
    volumeMin: user?.volume_min,
    volumeMax: user?.volume_max,
    profit: user?.profit_spread,
    profitSpread: user?.percent_spread,
    fee: user?.fee,
    notification: !!user?.monitoring,
    highRisk: !!user?.risk_type,
    hedgeType: !!user?.hedge_type,
  };
};

export const getEmptyFormData = () => {
  return {
    buy: {},
    sell: {},
    blackListNetwork: [],
    blackListCoins: [],
    volumeMin: '',
    volumeMax: '',
    profit: '',
    profitSpread: '',
    fee: '',
    notification: false,
    highRisk: false,
    hedgeType: false,
  };
};

export const transformFormData = (data: IFilterSelect) => {
  return {
    markets_buy: Object.entries(data.buy).reduce((acc, val) => {
      if (val[1]) return [...acc, val[0]];
      return acc;
    }, [] as string[]),
    markets_sell: Object.entries(data.sell).reduce((acc, val) => {
      if (val[1]) return [...acc, val[0]];
      return acc;
    }, [] as string[]),
    volume_min: String(data.volumeMin),
    volume_max: String(data.volumeMax),
    percent_spread: String(data.profitSpread),
    profit_spread: String(data.profit),
    fee: String(data.fee),
    monitoring: data.notification ? 1 : 0,
    risk_type: data.highRisk ? 1 : 0,
    hedge_type: data.hedgeType ? 1 : 0,
  };
};

const geValidateFunc = (value = '') =>
  value === ''
    ? string().test('required', '', (val: string | undefined) => {
        if (val) {
          return val.length > 0;
        }
        return false;
      })
    : number().positive().required();

export const schema = yup.object({
  buy: yup
    .object()
    .shape({})
    .test('buy', '', (value: IFilterSelect['buy']) => {
      return Object.values(value).some((el) => el);
    }),
  sell: yup
    .object()
    .shape({})
    .test('sell', '', (value: IFilterSelect['sell']) => {
      return Object.values(value).some((el) => el);
    }),
  blackListCoins: yup.array().of(yup.object().shape({ title: yup.string(), value: yup.string() })),
  blackListNetwork: yup.array().of(yup.object().shape({ title: yup.string(), value: yup.string() })),
  volumeMin: lazy(geValidateFunc),
  volumeMax: lazy(geValidateFunc),
  profit: lazy(geValidateFunc),
  profitSpread: lazy(geValidateFunc),
  fee: lazy(geValidateFunc),
  highRisk: yup.boolean(),
  hedgeType: yup.string(),
  notification: yup.boolean(),
});
