import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useLoginMutation, LoginRequest } from '../../../../services/auth.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setCredentials } from '../../../../features/auth/authSlice.ts';
import { useAuth } from '../../../../hooks/useAuth.ts';
import AppTextField from '../../../input/AppTextField.tsx';
import style from './login.module.scss';
import { useIntl } from 'react-intl';
import { Link } from '@mui/material';
import AppButton from '../../../button/AppButton.tsx';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { formatMessage } = useIntl();

  const [formData, setFormData] = useState<LoginRequest>({ email: '1@m.com', password: 'q123' });
  const [login, { isError }] = useLoginMutation();

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(formData).unwrap();
      dispatch(setCredentials(data));
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  if (auth.user) {
    return <Navigate to={'/private'} replace={true} />;
  }
  return (
    <form method={'post'} onSubmit={submitHandler} className={style.formWrapper}>
      <div className={style.inputsWrapper}>
        <AppTextField
          name="email"
          type="text"
          placeholder={formatMessage({ id: 'login.form.enter.email' })}
          required={true}
          onChange={handleChange}
          value={formData.email}
          autoComplete={'username'}
          variant={'standard'}
          label={formatMessage({ id: 'login.form.email' })}
          error={isError}
        />
        <AppTextField
          name="password"
          type="password"
          placeholder={formatMessage({ id: 'login.form.enter.password' })}
          variant={'standard'}
          required={true}
          onChange={handleChange}
          value={formData.password}
          autoComplete={'current-password'}
          label={formatMessage({ id: 'login.form.password' })}
          error={isError}
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
