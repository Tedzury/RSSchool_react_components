import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appStateSlice';
import { marvelApi } from '../shared/service/charListApi';

export const store = configureStore({
  reducer: {
    appReducer,
    [marvelApi.reducerPath]: marvelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(marvelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
