import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharObj } from '../shared/types/index';

export type AppStateType = {
  searchValue: string;
  charData: CharObj[];
  currPage: number;
  totalPages: number;
  limit: number;
  isListLoading: boolean;
  isDetailsLoading: boolean;
};

const initialState: AppStateType = {
  searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
  charData: [] as CharObj[],
  currPage: 0,
  totalPages: 0,
  limit: 5,
  isListLoading: false,
  isDetailsLoading: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.currPage = 0;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currPage = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    initListLoading: (state) => {
      state.isListLoading = true;
      state.charData = [];
    },
    setDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
    setCharList: (
      state,
      action: PayloadAction<{ charData: CharObj[]; totalPages: number }>
    ) => {
      state.isListLoading = false;
      state.charData = action.payload.charData;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const {
  setSearchValue,
  setLimit,
  setPage,
  initListLoading,
  setCharList,
  setDetailsLoading,
} = appStateSlice.actions;

export default appStateSlice.reducer;
