import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useLoginMutation } from '../../../../services/auth.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setCredentials } from '../../../../features/auth/authSlice.ts';
import { useAuth } from '../../../../hooks/useAuth.ts';
import AppTextField from '../../../input/AppTextField.tsx';
import style from './login.module.scss';
import { useIntl } from 'react-intl';
import { Link } from '@mui/material';
import AppButton from '../../../button/AppButton.tsx';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

type TInputs = {
  email: string;
  password: string;
};

// {
//   defaultValues: { email: '1@m.com', password: 'q123' },
// }
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { formatMessage } = useIntl();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>({
    defaultValues: { email: '', password: '' },
  });
  const [login, { isError }] = useLoginMutation();

  const submitHandler: SubmitHandler<TInputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  if (auth.user) {
    return <Navigate to={'/private'} replace={true} />;
  }
  return (
    <form method={'post'} onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
      <div className={style.inputsWrapper}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: formatMessage({ id: 'error.required' }),
            pattern: {
              value: /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/,
              message: formatMessage({ id: 'error.email.not.valid' }),
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <AppTextField
              name={name}
              type="text"
              placeholder={formatMessage({ id: 'login.form.enter.email' })}
              // required={true}
              onChange={onChange}
              value={value}
              autoComplete={'username'}
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
      <div className={style.resetPasswordWrapper}>
        <div>{formatMessage({ id: 'login.forgot.password' })}</div>
        <Link underline="none">{formatMessage({ id: 'login.reset.password' })}</Link>
      </div>
    </form>
  );
};

export default LoginForm;
