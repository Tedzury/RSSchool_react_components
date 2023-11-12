import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

const localStorageMock = (function () {
  const store: { [key: string]: string } = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Testing search bar component', () => {
  it('After clicking on "Search" button - value of search input should be saved into local storage', () => {
    render(<App />);
    expect(localStorage.getItem('reactComponentSearchTerm')).toBeNull();
    const searchInput = screen.getByPlaceholderText('Type a name!');
    const button = screen.getByText('Search');
    fireEvent.change(searchInput, {
      target: { value: 'Trololontiy' },
    });
    fireEvent.click(button);
    expect(localStorage.getItem('reactComponentSearchTerm')).toEqual(
      'Trololontiy'
    );
  });
  it('During app initialization it should retrieve search value from localStorage', () => {
    localStorage.setItem('reactComponentSearchTerm', 'Tralala');
    render(<App />);
    const searchInput = screen.getByPlaceholderText(
      'Type a name!'
    ) as HTMLInputElement;
    expect(searchInput.value).toEqual('Tralala');
  });
});
