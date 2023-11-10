import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import App from '../App';

describe('Testing pagination component', () => {
  it('After clicking to pagination next and prev buttons, changing of page should be visible in URL query.', async () => {
    render(<App />);
    const prevBtn = await screen.findByText('<');
    const nextBtn = await screen.findByText('>');
    expect(window.location.search).toMatch('?page=1');
    userEvent.click(nextBtn);
    waitFor(() => expect(window.location.search).toMatch('?page=2'));
    userEvent.click(nextBtn);
    waitFor(() => expect(window.location.search).toMatch('?page=3'));
    userEvent.click(prevBtn);
    waitFor(() => expect(window.location.search).toMatch('?page=2'));
  });
});
