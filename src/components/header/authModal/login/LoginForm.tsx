import { Navigate } from 'react-router-dom';
import { ILoginRequest, useLoginMutation } from '../../../../services/auth.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setCredentials } from '../../../../features/auth/authSlice.ts';
import { useAuth } from '../../../../hooks/useAuth.ts';
import AppTextField from '../../../input/AppTextField.tsx';
import style from './login.module.scss';
import { useIntl } from 'react-intl';
import AppButton from '../../../button/AppButton.tsx';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { VALIDATION_REGEX } from '../../../../constants';
import AppLink from '../../../link/AppLink.tsx';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { formatMessage } = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    defaultValues: { email: '', password: '' },
  });

  const [login, { isError }] = useLoginMutation();

  const submitHandler: SubmitHandler<ILoginRequest> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  if (auth) {
    return <Navigate to={'/dashboard'} replace={true} />;
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
      <div className={style.inputsWrapper}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: formatMessage({ id: 'error.required' }),
            pattern: {
              value: VALIDATION_REGEX.email,
              message: formatMessage({ id: 'error.email.not.valid' }),
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <AppTextField
              name={name}
              type="text"
              placeholder={formatMessage({ id: 'login.form.enter.email' })}
              onChange={onChange}
              value={value}
              autoComplete={'email'}
              variant={'standard'}
              helperText={errors[name]?.message}
              label={formatMessage({ id: 'login.form.email' })}
              error={!!errors[name] || isError}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: formatMessage({ id: 'error.required' }) }}
          render={({ field: { onChange, value, name } }) => {
            return (
              <AppTextField
                name={name}
                type="password"
                placeholder={formatMessage({ id: 'login.form.enter.password' })}
                variant={'standard'}
                onChange={onChange}
                value={value}
                autoComplete={'current-password'}
                label={formatMessage({ id: 'login.form.password' })}
                helperText={errors[name]?.message}
                error={!!errors[name] || isError}
              />
            );
          }}
        />
      </div>

      <AppButton type={'submit'} color={'primary'}>
        {formatMessage({ id: 'login' })}
      </AppButton>
      <div className={style.additionalData}>
        <div>{formatMessage({ id: 'login.forgot.password' })}</div>
        <AppLink underline="none" to={'/'}>
          {formatMessage({ id: 'login.reset.password' })}
        </AppLink>
      </div>
    </form>
  );
};

export default LoginForm;
