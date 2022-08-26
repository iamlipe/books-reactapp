import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';

import Warning from '@presentational/LoginScreen/Warning';

describe('Warning', () => {
  const error = 'something went wrong';

  test('should render correctly', () => {
    renderWithThemeProvider(<Warning error={error} />);
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<Warning error={error} />);
  });

  test('should render error', () => {
    const warning = renderWithThemeProvider(<Warning error={error} />);

    const errorWarning = warning.queryByText(error);

    expect(errorWarning).toBeTruthy();
  });
});
