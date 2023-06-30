import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdatePasswordMutation } from '../../../../../services/resetPassword.ts';
import { ICustomError, useLoginMutation } from '../../../../../services/auth.ts';
import style from '../resetPassword.module.scss';
import classNames from 'classnames';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AppTextField from '../../../../input/AppTextField.tsx';
import AppButton from '../../../../button/AppButton.tsx';
import { setCredentials } from '../../../../../features/auth/authSlice.ts';
import { useAppDispatch } from '../../../../../store/hooks.ts';

interface INewPasswordFormProps {
  email: string;
  setFormStep: (step: number) => void;
}
interface INewPasswordFormRequest {
  newPassword: string;
}
const NewPasswordForm: FC<INewPasswordFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPasswordFormRequest>({
    defaultValues: { newPassword: '' },
  });
  const [updatePassword, { error }] = useUpdatePasswordMutation();
  const [login] = useLoginMutation();

  const errorMessages = useMemo(() => {
    if (error) {
      const typedError = error as ICustomError;
      return formatMessage({
        id: 'reset.password.error.' + typedError.data.message.toLowerCase().replaceAll(' ', '.'),
      });
    }
  }, [error, formatMessage]);

  const submitHandler: SubmitHandler<INewPasswordFormRequest> = async (data) => {
    try {
      if (data.newPassword) {
        await updatePassword({
          newPassword: data.newPassword,
          token: localStorage.getItem('resetPasswordToken') as string,
        });

        const response = await login({
          email: props.email,
          password: data.newPassword,
        }).unwrap();

        localStorage.removeItem('resetPasswordToken');
        dispatch(setCredentials(response));

        props.setFormStep(1);
      }
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };
  return (
    <div className={style.wrapper}>
      <h4 className={style.title}>{formatMessage({ id: 'personal.info.new.password' })}</h4>
      <div className={classNames('text', style.maxWidth, style.subTitle)}>
        {formatMessage({ id: 'reset.password.form.enter.new.password' })}
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
        {errorMessages && (
          <div className={classNames('errorWrapper', style.maxWidth, style.errorBlockWrapper)}>
            <HighlightOffRoundedIcon sx={{ fontSize: 18, color: 'red' }} />
            <span>{errorMessages}</span>
          </div>
        )}
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
                classes={{ root: style.maxWidth }}
                autoComplete={'new-password'}
                label={formatMessage({ id: 'personal.info.new.password' })}
                helperText={errors[name]?.message}
                error={!!errors[name]}
              />
            );
          }}
        />
        <div className={style.btnWrapper}>
          <AppButton type={'submit'} color={'primary'}>
            {formatMessage({ id: 'reset.password.send.code' })}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordForm;
