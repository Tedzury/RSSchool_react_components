import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { FormDataType, AppStateType } from '../shared/types';
import { countryList } from '../shared/constants';

const initialState: AppStateType = {
  countryList,
  formsData: [] as FormDataType[],
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formsData = [...state.formsData, action.payload];
    },
  },
});

export const { addFormData } = appStateSlice.actions;
export default appStateSlice.reducer;
