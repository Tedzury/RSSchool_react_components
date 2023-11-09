import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../App';

describe('Test #1', () => {
  it('After app starts, it should fetch and render 5 list items for characters.', async () => {
    render(<App />);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });
  it('After selecting limit 10 characters per page, app should fetch and render 10 list items for characters.', async () => {
    render(<App />);
    expect(screen.getByRole('combobox')).toHaveValue('5');
    await userEvent.setup().selectOptions(screen.getByRole('combobox'), '10');
    expect(screen.getByRole('combobox')).toHaveValue('10');
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(10);
  });
  it('After typing character, which does not exist - it should show a div with message that it does not exist.', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Type a name!');
    const button = screen.getByText('Search');

    fireEvent.change(searchInput, {
      target: { value: 'Trololontiy' },
    });
    fireEvent.click(button);
    const noChar = await screen.findByText(
      'Sorry, there is no characters yet!'
    );
    expect(noChar).toBeInTheDocument();
  });
});
