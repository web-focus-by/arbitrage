import React, { useState } from 'react';
import { useSignupMutation, ILoginRequest } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from './authSlice';

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Signup = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [formData, setFormData] = useState<ILoginRequest>({ email: '', password: '' });
  const [signup, { isError }] = useSignupMutation();

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await signup(formData).unwrap();
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
    <div className={'container'}>
      <form method={'post'} onSubmit={submitHandler}>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required={true}
            onChange={handleChange}
            value={formData.email}
            autoComplete={'username'}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required={true}
            onChange={handleChange}
            value={formData.password}
            autoComplete={'current-password'}
          />
        </div>
        {isError && 'Signup error'}
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
