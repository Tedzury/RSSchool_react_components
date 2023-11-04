import { CharObj } from '../types';

const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const apiKey = 'd8fe8823c3b455a867e537974e39cd7e';

const defaultState = {
  searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
  isError: false,
  charData: [] as CharObj[],
  isLoading: false,
  currPage: 0,
  totalPages: 0,
  limit: 10,
};

export { baseUrl, apiKey, defaultState };
