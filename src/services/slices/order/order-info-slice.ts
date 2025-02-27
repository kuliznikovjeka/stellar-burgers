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

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    orderInfoSelector: (state) => state.orders,
    orderInfoErrorSelector: (state) => state.error,
    orderInfoLoadingSelector: (state) => state.isLoading
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

export const {
  orderInfoErrorSelector,
  orderInfoLoadingSelector,
  orderInfoSelector
} = orderInfoSlice.selectors;
export const orderInfoReducer = orderInfoSlice.reducer;
