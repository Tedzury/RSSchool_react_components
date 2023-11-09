import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../../App';

describe('CharCard proper info testing', async () => {
  it('Should render detailed characters data in detailed character card after clicking on their respective list item', async () => {
    render(<App />);
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
    userEvent.click(listItems[1]);
    expect(
      await screen.findByAltText('Picture of A-Bomb (HAS)')
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2 })
    ).toBeInTheDocument();
    expect(await screen.findByTestId('overlay')).toBeInTheDocument();
  });
});
