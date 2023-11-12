import { describe, expect, it } from 'vitest';
import getPaginationMove from '../helpers/getPaginationMove';

describe('Testing get pagination move component', () => {
  it('func should return prover pagination move over provided conditions', () => {
    const prev = getPaginationMove('prev', 5, 10);
    const next = getPaginationMove('next', 5, 10);
    const first = getPaginationMove('fisrt', 5, 10);
    const last = getPaginationMove('last', 5, 10);
    expect(prev).toEqual(4);
    expect(next).toEqual(6);
    expect(first).toEqual(0);
    expect(last).toEqual(10);
  });
});
