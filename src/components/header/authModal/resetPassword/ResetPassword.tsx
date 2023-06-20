import { useState } from 'react';
import GetResetCodeForm from './getResetCodeForm/GetResetCodeForm.tsx';
import CheckPasswordForm from './checkPasswordForm/CheckPasswordForm.tsx';
import NewPasswordForm from './newPasswordForm/NewPasswordForm.tsx';

const ResetPassword = () => {
  const [formStep, setFormStep] = useState(0);
  const [email, setEmail] = useState('');

  if (formStep === 0) {
    return <GetResetCodeForm setFormStep={setFormStep} setFormEmail={setEmail} />;
  }
  if (formStep === 1) {
    return <CheckPasswordForm email={email} setFormStep={setFormStep} />;
  }
  if (formStep === 2) {
    return <NewPasswordForm setFormStep={setFormStep} />;
  }
  return <div>ResetPassword</div>;
};

export default ResetPassword;
