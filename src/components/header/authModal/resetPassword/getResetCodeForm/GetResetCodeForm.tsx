import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '../../../../../services/resetPassword.ts';
import { ICustomError } from '../../../../../services/auth.ts';
import style from '../resetPassword.module.scss';
import classNames from 'classnames';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { VALIDATION_REGEX } from '../../../../../constants';
import AppTextField from '../../../../input/AppTextField.tsx';
import AppButton from '../../../../button/AppButton.tsx';

interface IResetPasswordRequest {
  email: string;
}
interface IGetResetCodeFormProps {
  setFormStep: (step: number) => void;
  setFormEmail: (step: string) => void;
}
const GetResetCodeForm: FC<IGetResetCodeFormProps> = (props) => {
  const { formatMessage } = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordRequest>({
    defaultValues: { email: '' },
  });
  const [sendCode, { error }] = useResetPasswordMutation();

  const errorMessages = useMemo(() => {
    if (error) {
      const typedError = error as ICustomError;
      return formatMessage({
        id: 'reset.password.error.' + typedError.data.message.toLowerCase().replaceAll(' ', '.'),
      });
    }
  }, [error, formatMessage]);

  const submitHandler: SubmitHandler<IResetPasswordRequest> = async (data) => {
    try {
      if (data.email) {
        await sendCode(data.email);
        props.setFormEmail(data.email);
        props.setFormStep(1);
      }
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };
  return (
    <div className={style.wrapper}>
      <h4 className={style.title}>{formatMessage({ id: 'reset.password.form.title' })}</h4>
      <div className={classNames('text', style.maxWidth, style.subTitle)}>
        {formatMessage({ id: 'reset.password.form.subtitle' })}
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
        {errorMessages && (
          <div className={classNames('errorWrapper', style.maxWidth, style.errorBlockWrapper)}>
            <HighlightOffRoundedIcon sx={{ fontSize: 18, color: 'red' }} />
            <span>{errorMessages}</span>
          </div>
        )}
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
              classes={{ root: style.maxWidth }}
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
        <div className={style.btnWrapper}>
          <AppButton type={'submit'} color={'primary'}>
            {formatMessage({ id: 'reset.password.send.code' })}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default GetResetCodeForm;
