import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../App';

describe('Chacter card component testing', () => {
  it('After starting app should fetch and render first 5 list items for characters with correct names.', async () => {
    render(<App />);
    const listItems = await screen.findAllByRole('heading', { level: 3 });
    expect(listItems[0]).toHaveTextContent('3-D Man');
    expect(listItems[1]).toHaveTextContent('A-Bomb (HAS)');
    expect(listItems[2]).toHaveTextContent('A.I.M.');
    expect(listItems[3]).toHaveTextContent('Aaron Stack');
    expect(listItems[4]).toHaveTextContent('Abomination (Emil Blonsky)');
  });
  it('After clicking on first list item it should open a detailed card section for proper character', async () => {
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
  });
  it('After clicking on first list item, it should make new api call', async () => {
    render(<App />);
    const request = vi.spyOn(window, 'fetch');
    const listItems = await screen.findAllByRole('link');
    userEvent.click(listItems[0]);
    waitFor(() => {
      expect(request).toBeCalledTimes(1);
      expect(request.mock.calls.length === 1).toBe(true);
    });
  });
});
