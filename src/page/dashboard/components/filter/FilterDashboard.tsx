import { useState } from 'react';
import style from './filterDashboard.module.scss';
import { useIntl } from 'react-intl';
import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import useWindow from '../../../../hooks/useWindow.ts';
import { Controller, SubmitHandler, useForm, UseFormGetValues } from 'react-hook-form';
import AppButton from '../../../../components/button/AppButton.tsx';
import { useAuth } from '../../../../hooks/useAuth.ts';
import { SHOP_ARR } from '../../../../constants';

interface IFilterSelect {
  [key: string]: boolean | { [key: string]: boolean };
}

enum CheckboxGroup {
  buy = 'buy',
  sell = 'sell',
}

enum CheckboxAll {
  buy = 'buyAll',
  sell = 'sellAll',
}

const checkboxes = (row: CheckboxGroup) => {
  return [
    ...SHOP_ARR.map((el) => ({
      name: el.toLowerCase(),
      checkboxGroup: row,
      label: 'dashboard.select.' + el.toLowerCase(),
    })),
  ];
};
const FilterDashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const [buyIndeterminate, setBuyIndeterminate] = useState(false);
  const [sellIndeterminate, setSellIndeterminate] = useState(false);
  const { user } = useAuth();

  const {
    watch,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFilterSelect>({
    defaultValues: {
      buy: user?.markets_buy.reduce((acc, val) => ({ ...acc, [val]: true }), {}),
      sell: user?.markets_sell.reduce((acc, val) => ({ ...acc, [val]: true }), {}),
    },
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
        checkboxesHandler(
          value as IFilterSelect,
          setBuyIndeterminate,
          getValues,
          setValue,
          CheckboxGroup.buy,
          CheckboxAll.buy,
        );
      }
      if (name?.includes(CheckboxGroup.sell) && value[CheckboxGroup.sell]) {
        checkboxesHandler(
          value as IFilterSelect,
          setSellIndeterminate,
          getValues,
          setValue,
          CheckboxGroup.sell,
          CheckboxAll.sell,
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [getValues, setValue, watch]);

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  useEffect(() => {
    console.log(user?.markets_buy.reduce((acc, val) => ({ ...acc, [val]: true }), {}));
  }, [user]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.select.subtitle' })}</div>
        <div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.buy' })}</div>
            <div>
              <Controller
                name={CheckboxAll.buy}
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
            <div>
              <Controller
                name={CheckboxAll.sell}
                control={control}
                render={({ field }) => (
                  <AppCheckbox
                    checkboxProps={{
                      ...field,
                      indeterminate: field.value ? false : sellIndeterminate,
                      onClick: (e) => {
                        const target = e.target as HTMLInputElement;
                        setValue(
                          CheckboxGroup.sell,
                          Object.assign(
                            {},
                            ...checkboxes(CheckboxGroup.sell).map((el) => ({ [el.name]: target.checked })),
                          ),
                        );
                      },
                    }}
                    formControlLabelProps={{ label: formatMessage({ id: 'dashboard.select.all' }) }}
                  />
                )}
              />
              {checkboxes(CheckboxGroup.sell).map((item, index) => (
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

interface ICheckboxHandler {
  (
    value: IFilterSelect,
    setIndeterminateHandler: (value: boolean) => void,
    getValues: UseFormGetValues<IFilterSelect>,
    setValue: (name: string, value: boolean) => void,
    checkboxType: CheckboxGroup,
    checkboxAll: CheckboxAll,
  ): void;
}

const checkboxesHandler: ICheckboxHandler = (
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

export default FilterDashboard;
