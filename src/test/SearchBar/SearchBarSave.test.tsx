import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../../App';
import { localStorageMock } from './localStorageMock';

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

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
});
