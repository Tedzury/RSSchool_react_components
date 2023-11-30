import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { FormDataType, AppStateType } from '../shared/types';

const initialState: AppStateType = {
  lastShown: 0,
  formsData: [] as FormDataType[],
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLastShown: (state, action: PayloadAction<number>) => {
      state.lastShown = action.payload;
    },
    addFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formsData = [...state.formsData, action.payload];
    },
  },
});

export const { setLastShown, addFormData } = appStateSlice.actions;
export default appStateSlice.reducer;
