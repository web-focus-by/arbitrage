import { useEffect, useState } from 'react';
import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { useIntl } from 'react-intl';
import style from './style.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegister } from '../../components/header/authModal/register/RegisterForm.tsx';
import AppTextField from '../../components/input/AppTextField.tsx';
import { VALIDATION_REGEX } from '../../constants';
import AppButton from '../../components/button/AppButton.tsx';
import AppLink from '../../components/link/AppLink.tsx';
import classNames from 'classnames';

interface IProfileForm extends IUserRegister {
  newPassword?: string;
  confirmPassword?: string;
}

const additionalData = [
  { name: 'profile.additional.resources.inter.exchange.bot', link: '/' },
  { name: 'profile.additional.resources.intra.exchange.bot', link: '/' },
  { name: 'profile.additional.resources.chat', link: '' },
];
const Profile = () => {
  const { formatMessage } = useIntl();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>({
    defaultValues: { email: '', username: '', telegramName: '', newPassword: '', confirmPassword: '' },
  });

  const submitHandler: SubmitHandler<IProfileForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  return (
    <>
      <Header />
      <div className={'container'}>
        <div className={style.wrapper}>
          <h3 className={classNames({ h1: windowSize.width < 1200 })}>{formatMessage({ id: 'profile.title' })}</h3>
          <div className={style.content}>
            <form onSubmit={handleSubmit(submitHandler)} className={style.formSectionWrapper}>
              <div>
                <h4>{formatMessage({ id: 'profile.personal.data' })}</h4>
                <div className={style.formSection}>
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
                    rules={{ required: formatMessage({ id: 'error.required' }) }}
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
                    rules={{ required: formatMessage({ id: 'error.required' }) }}
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
            <div>
              <div>
                <h4>{formatMessage({ id: 'profile.additional.resources' })}</h4>
                <div className={style.additionalDataWrapper}>
                  {additionalData.map((item, index) => (
                    <div className={style.textItem} key={item.name + index}>
                      <div className={'text'}>{formatMessage({ id: item.name })}</div>
                      {item.link === '' ? '-' : <AppLink to={item.link}>{formatMessage({ id: 'link' })}</AppLink>}
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.subscriptionWrapper}>
                <h4>{formatMessage({ id: 'profile.subscription' })}</h4>
                <div className={classNames('text', style.additionalDataWrapper)}>
                  {formatMessage({ id: 'profile.subscription.empty.content' })}
                </div>
                <div className={style.btnWrapper}>
                  <AppButton color={'secondary'} classes={{ root: style.btn }}>
                    {formatMessage({ id: 'profile.subscription.btn.select' })}
                  </AppButton>
                </div>
              </div>
              <div className={style.deleteAcc}>
                <div className={style.textItem}>
                  <div className={'text'}>{formatMessage({ id: 'profile.delete.text' })}</div>
                  <AppLink to={'/'} color={'error'}>
                    {formatMessage({ id: 'delete' })}
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
