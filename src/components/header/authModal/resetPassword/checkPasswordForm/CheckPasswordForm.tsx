import { useIntl } from 'react-intl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useCheckPasswordCodeMutation } from '../../../../../services/resetPassword.ts';
import { FC, useMemo } from 'react';
import { ICustomError } from '../../../../../services/auth.ts';
import style from '../resetPassword.module.scss';
import classNames from 'classnames';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AppTextField from '../../../../input/AppTextField.tsx';
import AppButton from '../../../../button/AppButton.tsx';

interface ICheckCodeRequest {
  code: string;
}
interface IGetResetCodeFormProps {
  setFormStep: (step: number) => void;
  email: string;
}
const CheckPasswordForm: FC<IGetResetCodeFormProps> = (props) => {
  const { formatMessage } = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckCodeRequest>({
    defaultValues: { code: '' },
  });
  const [sendCode, { error }] = useCheckPasswordCodeMutation();

  const errorMessages = useMemo(() => {
    if (error) {
      const typedError = error as ICustomError;
      return formatMessage({
        id: 'reset.password.error.' + typedError.data.message.toLowerCase().replaceAll(' ', '.'),
      });
    }
  }, [error, formatMessage]);

  const submitHandler: SubmitHandler<ICheckCodeRequest> = async (data) => {
    try {
      console.log(data);
      if (data.code) {
        await sendCode(data.code).unwrap();
        props.setFormStep(2);
      }
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };
  return (
    <div className={style.wrapper}>
      <h4 className={style.title}>{formatMessage({ id: 'reset.password.form.title' })}</h4>
      <div className={classNames('text', style.maxWidth, style.subTitle)}>
        {formatMessage({ id: 'reset.password.form.email.subtitle' }, { email: props.email })}
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className={style.formWrapper}>
        {errorMessages && (
          <div className={classNames('errorWrapper', style.maxWidth, style.errorBlockWrapper)}>
            <HighlightOffRoundedIcon sx={{ fontSize: 18, color: 'red' }} />
            <span>{errorMessages}</span>
          </div>
        )}
        <Controller
          name="code"
          control={control}
          rules={{
            required: formatMessage({ id: 'error.required' }),
          }}
          render={({ field: { onChange, value, name } }) => (
            <AppTextField
              name={name}
              type="text"
              placeholder={formatMessage({ id: 'login.form.enter.code' })}
              classes={{ root: style.maxWidth }}
              onChange={onChange}
              value={value}
              autoComplete={'none'}
              variant={'standard'}
              helperText={errors[name]?.message}
              label={formatMessage({ id: 'login.form.code' })}
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

export default CheckPasswordForm;
