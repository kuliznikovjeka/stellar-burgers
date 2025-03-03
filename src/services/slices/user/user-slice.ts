import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './thunks';

type TInitialState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  isLoading: boolean;
  loginError: string | null;
  registerError: string | null;
  checkAuthError: string | null;
  logoutError: string | null;
  updateUserError: string | null;
  forgotPasswordError: string | null;
};

const initialState: TInitialState = {
  isAuthenticated: false,
  isAuthChecked: false,
  userData: null,
  isLoading: false,
  loginError: null,
  registerError: null,
  checkAuthError: null,
  logoutError: null,
  updateUserError: null,
  forgotPasswordError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userDataSelector: (state) => state.userData,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    loginErrorSelector: (state) => state.loginError,
    registerErrorSelector: (state) => state.registerError,
    checkAuthErrorSelector: (state) => state.checkAuthError,
    updateUserErrorSelector: (state) => state.updateUserError,
    forgotPasswordErrorSelector: (state) => state.forgotPasswordError,
    userLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.loginError = action.error.message || 'Не удалось войти в аккаунт';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.registerError =
          action.error.message || 'Не удалось зарегистрироваться';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.checkAuthError = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.checkAuthError =
          action.error.message ||
          'Ошибка проверки авторизованности пользователя';
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError =
          action.error.message || 'Не удалось выйти из аккаунта';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.updateUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordError =
          action.error.message || 'Не удалось восстановить пароль';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  isAuthCheckedSelector,
  userDataSelector,
  isAuthenticatedSelector,
  userLoadingSelector,
  loginErrorSelector,
  registerErrorSelector,
  checkAuthErrorSelector,
  updateUserErrorSelector,
  forgotPasswordErrorSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
