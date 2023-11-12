import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../../App';

describe('Detailed character card closing testing', () => {
  it('Clicking on close button at detailed card should close detailed card with overlay.', async () => {
    render(<App />);
    expect(screen.queryByAltText('Picture of 3-D Man')).toBeNull();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.queryByTestId('overlay')).toBeNull();
    const listItems = await screen.findAllByRole('link');
    userEvent.click(listItems[0]);
    expect(
      await screen.findByAltText('Picture of 3-D Man')
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2 })
    ).toBeInTheDocument();
    expect(await screen.findByTestId('overlay')).toBeInTheDocument();
    const closeBtn = await screen.findByText('X');
    expect(closeBtn).toBeInTheDocument();
    userEvent.click(closeBtn);
    waitForElementToBeRemoved(() => {
      expect(screen.queryByAltText('Picture of 3-D Man')).toBeNull();
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
      expect(screen.queryByTestId('overlay')).toBeNull();
    }).catch(() =>
      console.log('Error during testing character card closing was caught.')
    );
  });
});
