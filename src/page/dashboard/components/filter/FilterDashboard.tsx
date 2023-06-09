import { FC, useCallback, useState } from 'react';
import style from './filterDashboard.module.scss';
import { useIntl } from 'react-intl';
import { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import useWindow from '../../../../hooks/useWindow.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AppButton from '../../../../components/button/AppButton.tsx';
import AppTextField from '../../../../components/input/AppTextField.tsx';
import AppAutocomplete, { TAppAutocompleteOptions } from '../../../../components/autocomplete/AppAutocomplete.tsx';
import AppSwitch from '../../../../components/switch/AppSwitch.tsx';
import { selectAllMarkets } from '../../../../features/general/generalSelect.ts';
import { useAppSelector } from '../../../../store/hooks.ts';
import { selectUserInfo } from '../../../../features/userInfo/userInfoSelect.ts';
import Modal from '../../../../components/modal/Modal.tsx';
import { checkboxesHandler, getDefaultFormData, getEmptyFormData, transformFormData } from './filterDashboard.ts';
import { useUpdateUserInfoMutation } from '../../../../services/userInfo.ts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { lazy, number, string } from 'yup';

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

interface IFilterDashboardProps {
  closeModalHandler?: () => void;
}

const geValidateFunc = (value = '') =>
  value === ''
    ? string().test('required', '', (val: string | undefined) => {
        if (val) {
          return val.length > 0;
        }
        return false;
      })
    : number().positive().required();

const schema = yup.object({
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

const FilterDashboard: FC<IFilterDashboardProps> = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const [isOpen, setIsOpen] = useState(false);
  const [buyIndeterminate, setBuyIndeterminate] = useState(false);
  const [sellIndeterminate, setSellIndeterminate] = useState(false);
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const user = useAppSelector(selectUserInfo);
  const markets = useAppSelector(selectAllMarkets);

  const marketNameArray = useMemo(() => {
    return markets.map((el) => el.market);
  }, [markets]);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const blackListCoinsOptions: TAppAutocompleteOptions[] = useMemo(() => {
    return markets.map((el) => ({
      title: el.name,
      value: el.market,
    }));
  }, [markets]);

  const checkboxes = useCallback(
    (row: CheckboxGroup) => {
      return [
        ...markets.map((el) => ({
          name: el.market,
          checkboxGroup: row,
          label: el.name,
        })),
      ];
    },
    [markets],
  );

  const {
    watch,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IFilterSelect>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: useMemo(() => {
      if (user) {
        return getDefaultFormData(user, marketNameArray);
      }
      return getEmptyFormData();
    }, [user, marketNameArray]),
  });

  const subtitleClass = useMemo(() => {
    if (windowSize.width < 1200) {
      return 'text2';
    }
    return 'subtitle3';
  }, [windowSize.width]);

  const submitForm: SubmitHandler<IFilterSelect> = async (data) => {
    console.log(data);
    try {
      if (isValid) {
        const response = await updateUserInfo(transformFormData(data)).unwrap();
        console.log({ response });
      }
    } catch (error) {
      //TODO handle error
      console.log({ error });
    }

    closeModalHandler();
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if ((name?.includes(CheckboxGroup.buy) && value[CheckboxGroup.buy]) || type === undefined) {
        checkboxesHandler(
          value as IFilterSelect,
          setBuyIndeterminate,
          getValues,
          setValue,
          CheckboxGroup.buy,
          CheckboxAll.buy,
        );
      }
      if ((name?.includes(CheckboxGroup.sell) && value[CheckboxGroup.sell]) || type === undefined) {
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
    if (user) {
      reset(getDefaultFormData(user, marketNameArray));
    }
  }, [reset, user, marketNameArray]);

  const Form = (
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
                  key={item.name + index}
                  control={control}
                  render={({ field }) => (
                    <AppCheckbox
                      checkboxProps={{
                        ...field,
                      }}
                      formControlLabelProps={{ label: item.label }}
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
                  key={item.name + index}
                  control={control}
                  render={({ field }) => (
                    <AppCheckbox
                      checkboxProps={{
                        ...field,
                      }}
                      formControlLabelProps={{ label: item.label }}
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
                    inputProps={{ inputMode: 'numeric', 'aria-valuemin': 0 }}
                    variant={'standard'}
                    label={formatMessage({ id: 'dashboard.input.value.min' })}
                    placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                    classes={{ root: style.textFieldWrapper }}
                    error={!!errors.volumeMin}
                    helperText={errors.volumeMin && formatMessage({ id: 'error.' + errors.volumeMin?.type })}
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
                  inputProps={{ inputMode: 'numeric', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.max' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                  error={!!errors.volumeMax}
                  helperText={errors.volumeMax && formatMessage({ id: 'error.' + errors.volumeMax?.type })}
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
                  inputProps={{ inputMode: 'numeric', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.profit' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                  error={!!errors.profit}
                  helperText={errors.profit && formatMessage({ id: 'error.' + errors.profit?.type })}
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
                  inputProps={{ inputMode: 'numeric', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.profit.spread' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{ root: style.textFieldWrapper }}
                  error={!!errors.profitSpread}
                  helperText={errors.profitSpread && formatMessage({ id: 'error.' + errors.profitSpread?.type })}
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
                  inputProps={{ inputMode: 'numeric', 'aria-valuemin': 0 }}
                  variant={'standard'}
                  label={formatMessage({ id: 'dashboard.input.value.fee.max' })}
                  placeholder={formatMessage({ id: 'dashboard.input.value.placeholder' })}
                  classes={{
                    root: classNames(style.textFieldWrapper, style.lastTextWrapper),
                  }}
                  error={!!errors.fee}
                  helperText={errors.fee && formatMessage({ id: 'error.' + errors.fee?.type })}
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

  if (windowSize.width > 991) {
    return Form;
  }
  return (
    <div className={style.filterButton}>
      <AppButton
        classes={{ root: style.btnPadding }}
        color={'secondary'}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {formatMessage({ id: 'filter' })}
      </AppButton>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} children={Form} classNames={style.modalWrapper} />
    </div>
  );
};

export default FilterDashboard;
