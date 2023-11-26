import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, Mock } from 'vitest';
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
  it('After typing character, which does not exist - it should show a div with message that it does not exist.', async () => {
    const props = await getServerSideProps({
      query: { name: 'Trololontiy', limit: 5, page: 1 },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <Index data={props.props.data} totalResults={props.props.totalResults} />
    );
    expect(
      await screen.findByText('Sorry, there is no characters yet!')
    ).toBeInTheDocument();
  });
});
