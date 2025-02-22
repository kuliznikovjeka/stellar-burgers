import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const EMAIL = 'email';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie(ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie(ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
    localStorage.setItem(EMAIL, response.user.email);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  localStorage.removeItem(REFRESH_TOKEN);
  deleteCookie(ACCESS_TOKEN);
  return response;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async () => {
    const response = await getUserApi();
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response;
  }
);
