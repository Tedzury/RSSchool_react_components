import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import Index, { getServerSideProps } from '../../../pages';

import { useRouter } from 'next/router';

describe('Characters list component testing', () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  (useRouter as Mock).mockReturnValue({
    query: { name: '' },
    push: (str: string) => window.history.pushState('', '', str),
  });
  it('After app starts, it should fetch and render 5 list items for characters.', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 5, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });
  it('After selecting limit 10 characters per page, app should fetch and render 10 list items for characters.', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 10, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(10);
  });
});
