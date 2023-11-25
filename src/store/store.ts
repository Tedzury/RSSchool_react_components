import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appStateSlice';
import { marvelApi } from '../shared/service/charListApi';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: {
      appReducer,
      [marvelApi.reducerPath]: marvelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(marvelApi.middleware),
  });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store);
