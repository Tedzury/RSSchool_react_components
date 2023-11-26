import { render, screen, waitFor } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import Index, { getServerSideProps } from '../../pages';

import { useRouter } from 'next/router';

describe('Testing pagination component', async () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  (useRouter as Mock).mockReturnValue({
    query: { name: '' },
    push: (str: string) => window.history.pushState('', '', str),
  });
  it('After clicking to pagination next and prev buttons, changing of page should be visible in URL query.', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 5, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    const prevBtn = await screen.findByText('<');
    const nextBtn = await screen.findByText('>');
    expect(window.location.search).toMatch('?&page=1&limit=5&name=');
    userEvent.click(nextBtn);
    waitFor(() =>
      expect(window.location.search).toMatch('?&page=2&limit=5&name=')
    );
    userEvent.click(nextBtn);
    waitFor(() =>
      expect(window.location.search).toMatch('?&page=3&limit=5&name=')
    );
    userEvent.click(prevBtn);
    waitFor(() =>
      expect(window.location.search).toMatch('?&page=2&limit=5&name=')
    );
  });
});
