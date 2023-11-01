import { CharObj } from '../shared/types';

export const defaultState = {
  searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
  isError: false,
  charData: [] as CharObj[],
  isLoading: false,
};
