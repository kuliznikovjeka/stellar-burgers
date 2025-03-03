import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

type TInitialState = {
  feedList: TOrder[];
  feedListInfo: {
    total: number;
    totalToday: number;
  };
  feedData: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  feedList: [],
  feedListInfo: {
    total: 0,
    totalToday: 0
  },
  feedData: null,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const feeds = await getFeedsApi();
  return feeds;
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedDataSelector: (state) => state.feedData,
    feedListSelector: (state) => state.feedList,
    feedListInfoSelector: (state) => state.feedListInfo,
    feedsErrorSelector: (state) => state.error,
    feedsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить лист заказов';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feedList = action.payload.orders;
        state.feedListInfo.total = action.payload.total;
        state.feedListInfo.totalToday = action.payload.totalToday;
      });
  }
});

export const {
  feedDataSelector,
  feedListInfoSelector,
  feedListSelector,
  feedsErrorSelector,
  feedsLoadingSelector
} = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
