import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { localStorageMock } from './localStorageMock';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { SearchBar } from '../../components/indexComponents';

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('Testing search bar component', () => {
  it('During app initialization it should retrieve search value from localStorage', () => {
    localStorage.setItem('reactComponentSearchTerm', 'Tralala');
    type mockAppStateType = {
      searchValue: string;
    };

    const initialState: mockAppStateType = {
      searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
    };

    const mockAppStateSlice = createSlice({
      name: 'mockAppState',
      initialState,
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        appReducer: mockAppStateSlice.reducer,
      },
    });

    render(
      <Provider store={store}>
        <SearchBar />;
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText(
      'Type a name!'
    ) as HTMLInputElement;
    expect(searchInput.value).toEqual('Tralala');
  });
});
