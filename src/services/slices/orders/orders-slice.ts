import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
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

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    ordersErrorSelector: (state) => state.error,
    ordersLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      });
  }
});

export const { ordersSelector, ordersErrorSelector, ordersLoadingSelector } =
  ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
