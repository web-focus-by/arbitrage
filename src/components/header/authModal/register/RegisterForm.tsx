import { useEffect, useMemo, useState } from 'react';
import { useSignupMutation, ILoginRequest, ICustomError } from '../../../../services/auth.ts';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setCredentials } from '../../../../features/auth/authSlice.ts';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from '../login/login.module.scss';
import { VALIDATION_REGEX } from '../../../../constants';
import AppTextField from '../../../input/AppTextField.tsx';
import { useIntl } from 'react-intl';
import AppButton from '../../../button/AppButton.tsx';
import AppLink from '../../../link/AppLink.tsx';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Modal from '../../../modal/Modal.tsx';

export interface IUserRegister extends ILoginRequest {
  username: string;
  telegramName: string;
}
const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    defaultValues: { email: '', username: '', telegramName: '', password: '' },
  });

  const [signup, { isError, error }] = useSignupMutation();

  const errorMessages = useMemo(() => {
    if (error) {
      const typedError = error as ICustomError;
      return formatMessage({ id: 'error.' + typedError.data.message.toLowerCase().replaceAll(' ', '.') });
    }
  }, [error, formatMessage]);
  const submitHandler: SubmitHandler<IUserRegister> = async (data) => {
    try {
      const response = await signup(data).unwrap();
      dispatch(setCredentials(response));
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  useEffect(() => {
    if (auth.user) {
      setIsOpen(true);
    }
  }, [auth.user]);

  const navigateHandler = () => {
    navigate('/private');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
        {errorMessages && (
          <div className={style.error}>
            <HighlightOffRoundedIcon sx={{ fontSize: 18, color: 'red' }} />
            <span>{errorMessages}</span>
          </div>
        )}
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
          {formatMessage({ id: 'register' })}
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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={formatMessage({ id: 'success.register.modal.title' })}
        text={formatMessage({ id: 'success.register.modal.text' })}
        actions={
          <AppButton onClick={navigateHandler} classes={{ root: 'button-padding' }}>
            {formatMessage({ id: 'success.register.modal.btn.text' })}
          </AppButton>
        }
      />
    </>
  );
};

export default RegisterForm;
