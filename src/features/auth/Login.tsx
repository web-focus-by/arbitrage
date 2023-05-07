import React, { useState } from 'react';
import { useLoginMutation, LoginRequest } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from './authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginRequest>({ email: '1@m.com', password: 'q123' });
  const [login] = useLoginMutation();

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(formData).unwrap();
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
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
