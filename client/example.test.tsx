import React from 'react';
import {render} from '@testing-library/react';

test('works', () => {
  render(<p>Hello world</p>);
  expect(true).toBe(true);
});
