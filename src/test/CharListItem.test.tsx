import { render, screen, waitFor } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Index, { getServerSideProps } from '../../pages';
import { useRouter } from 'next/router';

describe('Chacter card component testing', () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  (useRouter as Mock).mockReturnValue({
    query: { name: '' },
    push: (str: string) => window.history.pushState('', '', str),
  });
  it('After starting app should fetch and render first 5 list items for characters with correct names.', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 5, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    const listItems = await screen.findAllByRole('heading', { level: 3 });
    expect(listItems[0]).toHaveTextContent('3-D Man');
    expect(listItems[1]).toHaveTextContent('A-Bomb (HAS)');
    expect(listItems[2]).toHaveTextContent('A.I.M.');
    expect(listItems[3]).toHaveTextContent('Aaron Stack');
    expect(listItems[4]).toHaveTextContent('Abomination (Emil Blonsky)');
  });
  it('After clicking on first list item, it should make new api call', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 5, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    const request = vi.spyOn(window, 'fetch');
    const listItems = await screen.findAllByRole('link');
    userEvent.click(listItems[0]);
    waitFor(() => {
      expect(request).toBeCalledTimes(1);
      expect(request.mock.calls.length === 1).toBe(true);
    });
  });
});
