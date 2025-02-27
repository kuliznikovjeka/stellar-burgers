import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  ingredientsReducer,
  ordersReducer,
  orderReducer,
  feedsReducer,
  userReducer,
  burgerConstructorReducer,
  orderInfoReducer
} from '@slices';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  order: orderReducer,
  orderInfo: orderInfoReducer,
  feeds: feedsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
