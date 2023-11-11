import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from '../App';

describe('Testing route fallback component', () => {
  it('landing on a bad page', async () => {
    // not implemented test
    // window.history.pushState({}, 'Test Title', '/your-route');
    render(<App />);
    // console.log(window.location.href);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // screen.debug();
  });
});
