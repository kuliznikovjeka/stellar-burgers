import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  isAuthenticatedSelector,
  loginErrorSelector,
  userLoadingSelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/user/thunks';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const error = useSelector(loginErrorSelector);
  const isLoading = useSelector(userLoadingSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isEmpty = !email || !password;
    if (isEmpty) return;

    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      isLoading={isLoading}
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
