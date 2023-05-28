import { useState } from 'react';
import style from './filterDashboard.module.scss';
import { useIntl } from 'react-intl';
import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import useWindow from '../../../../hooks/useWindow.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AppButton from '../../../../components/button/AppButton.tsx';

interface IFilterSelect {
  [key: string]: boolean;
}

enum CheckboxGroup {
  buy = 'buy',
  sell = 'sell',
}

const checkboxes = (row: CheckboxGroup) => {
  const shopArr = ['Binance', 'Bybit', 'Kucoin', 'OKX', 'Gateio', 'Huobi', 'Poloniex', 'Mexc'];
  return [
    ...shopArr.map((el) => ({
      name: el,
      checkboxGroup: row,
      label: 'dashboard.select.' + el.toLowerCase(),
    })),
  ];
};
const FilterDashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const [buyIndeterminate, setBuyIndeterminate] = useState(false);

  const {
    watch,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFilterSelect>({
    defaultValues: {},
  });

  const subtitleClass = useMemo(() => {
    if (windowSize.width < 1200) {
      return 'text2';
    }
    return 'subtitle3';
  }, [windowSize.width]);

  const submitForm: SubmitHandler<IFilterSelect> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.includes(CheckboxGroup.buy) && value[CheckboxGroup.buy]) {
        const isSomeSelected = Object.entries(value[CheckboxGroup.buy]).some((el) => {
          if (el[1] === true) {
            setBuyIndeterminate(true);
            return true;
          }
          return false;
        });
        const isAllSelected = Object.entries(value[CheckboxGroup.buy]).every((el) => {
          return el[1] === true;
        });

        if (isAllSelected) {
          if (getValues('buyAll') === false || getValues('buyAll') === undefined) {
            setValue('buyAll', true);
          }
        } else {
          if (getValues('buyAll') === true) {
            setValue('buyAll', false);
          }
        }

        if (!isSomeSelected) setBuyIndeterminate(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.select.subtitle' })}</div>
        <div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.buy' })}</div>
            <div>
              <Controller
                name={'buyAll'}
                control={control}
                render={({ field }) => (
                  <AppCheckbox
                    checkboxProps={{
                      ...field,
                      indeterminate: field.value ? false : buyIndeterminate,
                      onClick: (e) => {
                        const target = e.target as HTMLInputElement;
                        setValue(
                          CheckboxGroup.buy,
                          Object.assign(
                            {},
                            ...checkboxes(CheckboxGroup.buy).map((el) => ({ [el.name]: target.checked })),
                          ),
                        );
                      },
                    }}
                    formControlLabelProps={{ label: formatMessage({ id: 'dashboard.select.all' }) }}
                  />
                )}
              />
              {checkboxes(CheckboxGroup.buy).map((item, index) => (
                <Controller
                  name={item.checkboxGroup + '.' + item.name}
                  key={item.label + index}
                  control={control}
                  render={({ field }) => (
                    <AppCheckbox
                      checkboxProps={{
                        ...field,
                      }}
                      formControlLabelProps={{ label: formatMessage({ id: item.label }) }}
                    />
                  )}
                />
              ))}
            </div>
          </div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.sell' })}</div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.setting.subtitle' })}</div>

        <div></div>
      </div>
      <AppButton type={'submit'}>{formatMessage({ id: 'dashboard.submit' })}</AppButton>
    </form>
  );
};

export default FilterDashboard;
