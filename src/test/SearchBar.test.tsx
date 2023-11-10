import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  it('After clicking on "Search" button - value of search input should be saved into local storage', async () => {
    render(<App />);
    expect(localStorage.getItem('reactComponentSearchTerm')).toBeNull();
    const searchInput = screen.getByPlaceholderText('Type a name!');
    const button = screen.getByText('Search');
    fireEvent.change(searchInput, {
      target: { value: 'Trololontiy' },
    });
    fireEvent.click(button);
    waitFor(() => {
      expect(localStorage.getItem('reactComponentSearchTerm')).toMatch(
        'Trololontiy'
      );
    });
  });
  // it('During app initialization it should retrieve search value from localStorage', async () => {
  //   const { rerender } = render(<App />);
  //   localStorage.setItem('reactComponentSearchTerm', 'La-la-la');
  //   rerender(<App />);
  //   const searchInput = screen.getByPlaceholderText('Type a name!');
  //   const button = screen.getByText('Search');
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   screen.debug();
  // });
});
