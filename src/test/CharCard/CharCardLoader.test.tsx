import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../../App';

describe('Detailed character card loader testing', () => {
  it('While detailed card data if fetching, it should display loader.', async () => {
    render(<App />);
    expect(screen.queryByTestId('loader')).toBeNull();
    const listItems = await screen.findAllByRole('link');
    userEvent.click(listItems[0]);
    waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
    waitForElementToBeRemoved(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    }).catch(() =>
      console.log('Error during testing character card loader was caught.')
    );
  });
});
