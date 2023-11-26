import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, Mock } from 'vitest';
import { localStorageMock } from './localStorageMock';
import { SearchBar } from '../../components/indexComponents';
import { useRouter } from 'next/router';

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('Testing search bar component', () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  (useRouter as Mock).mockReturnValue({
    query: { name: 'tralala' },
  });
  it('During app initialization it should retrieve search value from localStorage', () => {
    render(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(
      'Type a name!'
    ) as HTMLInputElement;
    expect(searchInput.value).toEqual('tralala');
  });
});
