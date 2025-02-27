import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TInitialState = {
  orderModalData: TOrder | null;
  lastOrderName: string;
  orderRequest: boolean;
  orderAccept: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  orderModalData: null,
  lastOrderName: '',
  orderRequest: false,
  orderAccept: false,
  isLoading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    handleCloseOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    orderAcceptSelector: (state) => state.orderAccept,
    orderErrorSelector: (state) => state.error,
    orderLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось сделать заказ';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderAccept = true;
        state.orderModalData = action.payload.order;
        state.lastOrderName = action.payload.name;
      });
  }
});

export const {
  orderErrorSelector,
  orderLoadingSelector,
  orderAcceptSelector,
  orderModalDataSelector,
  orderRequestSelector
} = makeOrderSlice.selectors;

export const { handleCloseOrderModal } = makeOrderSlice.actions;

export const orderReducer = makeOrderSlice.reducer;
