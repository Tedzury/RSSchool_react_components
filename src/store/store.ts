import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appStateSlice';

export const store = configureStore({
  reducer: { appReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
