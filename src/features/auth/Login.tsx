import React, { useState } from 'react';
import { useLoginMutation, LoginRequest } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from './authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginRequest>({ username: '', password: '' });
  const [login] = useLoginMutation();

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(formData);
      dispatch(setCredentials(data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  return (
    <div className={'container'}>
      <form method={'post'} onSubmit={submitHandler}>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Email"
            required={true}
            onChange={handleChange}
            value={formData.username}
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
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
