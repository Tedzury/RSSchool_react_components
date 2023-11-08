import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
