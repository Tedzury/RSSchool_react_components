import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../App';

describe('Characters list component testing', () => {
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
});
