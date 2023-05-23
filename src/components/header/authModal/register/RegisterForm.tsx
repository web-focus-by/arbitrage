import { useSignupMutation, ILoginRequest } from '../../../../services/auth.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setCredentials } from '../../../../features/auth/authSlice.ts';

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from '../login/login.module.scss';
import { VALIDATION_REGEX } from '../../../../constants';
import AppTextField from '../../../input/AppTextField.tsx';
import { useIntl } from 'react-intl';
import AppButton from '../../../button/AppButton.tsx';
import AppLink from '../../../link/AppLink.tsx';

interface IUserRegister extends ILoginRequest {
  username: string;
  telegramName: string;
}
const RegisterForm = () => {
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    defaultValues: { email: '', username: '', telegramName: '', password: '' },
  });

  const [signup, { isError }] = useSignupMutation();

  const submitHandler: SubmitHandler<IUserRegister> = async (data) => {
    try {
      const response = await signup(data).unwrap();
      dispatch(setCredentials(response));
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  if (auth.user) {
    return <Navigate to={'/private'} replace={true} />;
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
      <div className={style.inputsWrapper}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: formatMessage({ id: 'error.required' }),
          }}
          render={({ field: { onChange, value, name } }) => (
            <AppTextField
              name={name}
              type="text"
              placeholder={formatMessage({ id: 'login.form.enter.name' })}
              onChange={onChange}
              value={value}
              autoComplete={'name'}
              variant={'standard'}
              helperText={errors[name]?.message}
              label={formatMessage({ id: 'login.form.name' })}
              error={!!errors[name] || isError}
            />
          )}
        />
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
          name="telegramName"
          control={control}
          rules={{
            required: formatMessage({ id: 'error.required' }),
            pattern: {
              value: VALIDATION_REGEX.telegramUsername,
              message: formatMessage({ id: 'error.telegram.username.not.valid' }),
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <AppTextField
              name={name}
              type="text"
              placeholder={formatMessage({ id: 'login.form.enter.telegram.username' })}
              onChange={onChange}
              value={value}
              variant={'standard'}
              helperText={errors[name]?.message}
              label={formatMessage({ id: 'login.form.telegram.username' })}
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
                autoComplete={'new-password'}
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
        <div>
          {formatMessage(
            { id: 'register.confirm' },
            {
              link: (
                <AppLink underline="none" to={'/'}>
                  {formatMessage({ id: 'register.confirm.link.text' })}
                </AppLink>
              ),
            },
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
