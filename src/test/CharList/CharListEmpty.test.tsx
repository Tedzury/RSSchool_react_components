import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import MainLayout from '../../App';

describe('Characters list component testing', () => {
  it('After typing character, which does not exist - it should show a div with message that it does not exist.', async () => {
    render(<MainLayout />);
    const searchInput = screen.getByPlaceholderText('Type a name!');
    const button = screen.getByText('Search');
    act(() => {
      fireEvent.change(searchInput, {
        target: { value: 'Trololontiy' },
      });
      userEvent.click(button);
    });
    expect(
      await screen.findByText('Sorry, there is no characters yet!')
    ).toBeInTheDocument();
  });
});
