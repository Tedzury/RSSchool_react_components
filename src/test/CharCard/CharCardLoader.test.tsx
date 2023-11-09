import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../../App';

describe('Detailed character card loader testing', () => {
  it('While detailed card data if fetching, it should display loader.', async () => {
    render(<App />);
    expect(screen.queryByTestId('loader')).toBeNull();
    const listItems = await screen.findAllByRole('link');
    userEvent.click(listItems[0]);
    setTimeout(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    }, 100);
    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
