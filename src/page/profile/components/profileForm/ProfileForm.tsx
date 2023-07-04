import style from '../../style.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AppTextField from '../../../../components/input/AppTextField.tsx';
import { VALIDATION_REGEX } from '../../../../constants';
import AppButton from '../../../../components/button/AppButton.tsx';
import { IUserRegister } from '../../../../components/header/authModal/register/RegisterForm.tsx';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../../store/hooks.ts';
import { selectUserInfo } from '../../../../features/userInfo/userInfoSelect.ts';
import { useEffect, useMemo } from 'react';
import { getDefaultFormValue } from './profileFrom.ts';
import { useUpdateProfilePasswordMutation, useUpdateUserInfoMutation } from '../../../../services/userInfo.ts';

interface IProfileForm extends IUserRegister {
  newPassword?: string;
  confirmPassword?: string;
}

const ProfileForm = () => {
  const { formatMessage } = useIntl();
  const user = useAppSelector(selectUserInfo);
  const [updatePassword] = useUpdateProfilePasswordMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    console.log({ user });
  }, [user]);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>({
    defaultValues: useMemo(() => {
      return getDefaultFormValue(user);
    }, [user]),
  });

  useEffect(() => {
    if (user) {
      reset(getDefaultFormValue(user));
    }
  }, [reset, user]);
  const submitHandler: SubmitHandler<IProfileForm> = async (data) => {
    try {
      const userInfoUpdateData = {
        name: data.name,
        email: data.email,
        telegram: data.telegram,
      };
      await updateUserInfo(userInfoUpdateData).unwrap();
      if (data.newPassword && data.newPassword !== '') {
        console.log('newPassword', data.newPassword);
        await updatePassword({ password: data.newPassword }).unwrap();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={style.formSectionWrapper}>
      <div>
        <h4>{formatMessage({ id: 'profile.personal.data' })}</h4>
        <div className={style.formSection}>
          <Controller
            name="name"
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
                error={!!errors[name]}
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
                error={!!errors[name]}
              />
            )}
          />
          <Controller
            name="telegram"
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
                error={!!errors[name]}
              />
            )}
          />
        </div>
      </div>
      <div>
        <h4>{formatMessage({ id: 'profile.change.password' })}</h4>
        <div className={style.formSection}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onChange, value, name } }) => {
              return (
                <AppTextField
                  name={name}
                  type="password"
                  placeholder={formatMessage({ id: 'personal.info.enter.new.password' })}
                  variant={'standard'}
                  onChange={onChange}
                  value={value}
                  autoComplete={'new-password'}
                  label={formatMessage({ id: 'personal.info.new.password' })}
                  helperText={errors[name]?.message}
                  error={!!errors[name]}
                />
              );
            }}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              validate: {
                positive: (value) =>
                  value === watch('newPassword') || formatMessage({ id: 'error.passwords.not.match' }),
              },
            }}
            render={({ field: { onChange, value, name } }) => {
              return (
                <AppTextField
                  name={name}
                  type="password"
                  placeholder={formatMessage({ id: 'personal.info.enter.confirm.new.password' })}
                  variant={'standard'}
                  onChange={onChange}
                  value={value}
                  autoComplete={'new-password'}
                  label={formatMessage({ id: 'personal.info.confirm.new.password' })}
                  helperText={errors[name]?.message}
                  error={!!errors[name]}
                />
              );
            }}
          />
        </div>
        <div className={style.btnWrapper}>
          <AppButton type={'submit'} color={'primary'} classes={{ root: style.btn }}>
            {formatMessage({ id: 'profile.save.changes' })}
          </AppButton>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
