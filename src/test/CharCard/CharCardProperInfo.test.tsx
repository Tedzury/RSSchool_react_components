import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import DetailsPage, { getServerSideProps } from '../../../pages/[slug]';
import { useRouter } from 'next/router';

describe('CharCard proper info testing', async () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));
  (useRouter as Mock).mockReturnValue({
    query: { name: '' },
    push: (str: string) => window.history.pushState('', '', str),
  });
  it('Should render detailed characters data in detailed character card after clicking on their respective list item', async () => {
    const props = await getServerSideProps({
      query: { name: '', limit: 5, page: 1, slug: 'id=1011334' },
    });
    await new Promise((res) => {
      setTimeout(res), 500;
    });
    render(
      <DetailsPage
        data={props.props.data}
        totalResults={props.props.totalResults}
      />
    );
    expect(
      await screen.findByAltText('Picture of 3-D Man')
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2 })
    ).toBeInTheDocument();
    expect(await screen.findByTestId('overlay')).toBeInTheDocument();
    const closeBtn = await screen.findByText('X');
    expect(closeBtn).toBeInTheDocument();
  });
});
