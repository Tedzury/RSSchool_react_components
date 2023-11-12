import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from '../components/indexComponents';

describe('Header', () => {
  it('Renders Marvel Characters', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Marvel Characters!aaaaaaaaaaaaaaqq');
  });
});
