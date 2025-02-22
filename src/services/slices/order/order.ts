import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    orderSelector: (state) => state.orders,
    orderErrorSelector: (state) => state.error,
    orderLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
      });
  }
});

export const { orderErrorSelector, orderLoadingSelector, orderSelector } =
  orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
