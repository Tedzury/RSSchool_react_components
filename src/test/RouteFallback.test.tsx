import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../pages/MainLayout';
import CharCard, {
  loader as charLoader,
} from '../components/CharCard/CharCard';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import RouteFallback from '../components/RouteFallback/RouteFallback';
import { userEvent } from '@testing-library/user-event';

describe('Testing route fallback component', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorFallback />,
        children: [
          {
            path: ':id',
            element: <CharCard />,
            loader: charLoader,
            errorElement: <RouteFallback />,
          },
        ],
      },
    ],
    { initialEntries: ['/it_is_so_bad_route'] }
  );
  it('Route fallback component is displayed when navigating to an invalid route', async () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/No such char!/i)).toBeInTheDocument();
    userEvent.click(screen.getByText('Go to home page'));
    waitForElementToBeRemoved(() => {
      expect(screen.getByText(/No such char!/i)).toBeNull();
    }).catch(() => console.log('Error during testing bad route was caught.'));
  });
});
