import { FC, useState } from 'react';
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
import AppTextField from '../../../../components/input/AppTextField.tsx';
import AppAutocomplete, { TAppAutocompleteOptions } from '../../../../components/autocomplete/AppAutocomplete.tsx';
import AppSwitch from '../../../../components/switch/AppSwitch.tsx';

interface IFilterSelect {
  [key: string]: boolean | number | string | string[] | TAppAutocompleteOptions[] | IFilterSelect;
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
interface IFilterDashboardProps {
  closeModalHandler: () => void;
}
const FilterDashboard: FC<IFilterDashboardProps> = ({ closeModalHandler }) => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const [buyIndeterminate, setBuyIndeterminate] = useState(false);
  const [sellIndeterminate, setSellIndeterminate] = useState(false);
  const { user } = useAuth();

  const blackListCoinsOptions: TAppAutocompleteOptions[] = useMemo(() => {
    // return user?.blacklist_coins.map((el) => el.toLowerCase());
    return SHOP_ARR.map((el) => ({
      title: el,
      value: el.toLowerCase(),
    }));
  }, []);

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
    closeModalHandler();
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
    console.log({ user });
  }, [user]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {windowSize.width < 991 && <span className={'h1'}>{formatMessage({ id: 'filter' })}</span>}
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.select.subtitle' })}</div>
        <div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.buy' })}</div>
            <div className={style.checkBoxWrapper}>
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
            <div className={style.checkBoxWrapper}>
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
        <div>
          <div className={classNames(style.subRowWrapper, style.inputRowWrapper)}>
            <Controller
              name={'volumeMin'}
              control={control}
              render={({ field }) => {
                return (
                  <AppTextField
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    type={'text'}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-valuemin': 0 }}
                    variant={'standard'}
                    label={formatMessage({ id: 'dashboard.input.value.min' })}
                    placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                    classes={{ root: style.textFieldWrapper }}
                  />
                );
              }}
            />
            <Controller
              name={'volumeMax'}
              control={control}
              render={({ field }) => (
                <AppTextField
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  type={'text'}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.max' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                />
              )}
            />
            <Controller
              name={'profit'}
              control={control}
              render={({ field }) => (
                <AppTextField
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  type={'text'}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.profit' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                />
              )}
            />
            <Controller
              name={'profitSpread'}
              control={control}
              render={({ field }) => (
                <AppTextField
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  type={'text'}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.profit.spread' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                />
              )}
            />
            <Controller
              name={'blackListCoins'}
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <AppAutocomplete
                  onChange={(_, data) => onChange(data)}
                  options={blackListCoinsOptions}
                  textFieldProps={field}
                  multiple={true}
                  classes={{ root: style.textFieldWrapper }}
                  aria-label={formatMessage({ id: 'dashboard.input.value.blacklist.coins' })}
                  placeholder={formatMessage({ id: 'select.options' })}
                />
              )}
            />
            <Controller
              name={'blackListNetwork'}
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <AppAutocomplete
                  onChange={(_, data) => onChange(data)}
                  options={blackListCoinsOptions}
                  textFieldProps={field}
                  multiple={true}
                  classes={{ root: style.textFieldWrapper }}
                  aria-label={formatMessage({ id: 'dashboard.input.value.blacklist.network' })}
                  placeholder={formatMessage({ id: 'select.options' })}
                />
              )}
            />
            <Controller
              name={'fee'}
              control={control}
              render={({ field }) => (
                <AppTextField
                  value={field.value}
                  onChange={field.onChange}
                  name={field.name}
                  type={'text'}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.fee.max' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{
                    root: classNames(style.textFieldWrapper, style.lastTextWrapper),
                  }}
                />
              )}
            />
            <Controller
              name={'highRisk'}
              control={control}
              render={({ field }) => (
                <AppCheckbox
                  checkboxProps={{
                    ...field,
                  }}
                  formControlLabelProps={{ label: formatMessage({ id: 'dashboard.input.value.high.risk' }) }}
                />
              )}
            />
            <Controller
              name={'hedgeType'}
              control={control}
              render={({ field }) => (
                <AppCheckbox
                  checkboxProps={{
                    ...field,
                  }}
                  formControlLabelProps={{ label: formatMessage({ id: 'dashboard.input.value.hedge.type' }) }}
                />
              )}
            />
            <Controller
              name={'notification'}
              control={control}
              render={({ field: { ref, value, onChange } }) => (
                <AppSwitch
                  switchProps={{ inputRef: ref, value: value, onChange: onChange }}
                  formControlLabelProps={{ label: formatMessage({ id: 'dashboard.input.value.send.notification' }) }}
                />
              )}
            />
            <div className={style.btnWrapper}>
              <AppButton type={'submit'} classes={{ root: style.btn }}>
                {formatMessage({ id: 'dashboard.submit' })}
              </AppButton>
            </div>
          </div>
        </div>
      </div>
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
