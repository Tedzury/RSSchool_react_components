import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, Mock } from 'vitest';
import { localStorageMock } from './localStorageMock';
import { SearchBar } from '../../components/indexComponents';
import { useRouter } from 'next/router';

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('Testing search bar component', () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  const pushMock = vi.fn();
  (useRouter as Mock).mockReturnValue({
    query: { name: '' },
    push: pushMock,
  });
  it('After clicking on "Search" button - value of search input should be saved into local storage', () => {
    render(<SearchBar />);
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
