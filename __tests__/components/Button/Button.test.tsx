import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';

import Button from '@presentational/LoginScreen/Button';

describe('Button', () => {
  const title = 'title';
  const onPress = jest.fn();

  test('should render correctly', () => {
    renderWithThemeProvider(<Button title={title} onPress={onPress} />);
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<Button title={title} onPress={onPress} />);
  });

  test('should render title correctly', () => {
    const button = renderWithThemeProvider(
      <Button title={title} onPress={onPress} />,
    );

    const titleButton = button.queryByText(title);

    expect(titleButton).toBeTruthy();
  });

  test('should render loading', () => {
    const button = renderWithThemeProvider(
      <Button title={title} onPress={onPress} loading />,
    );

    const loadingButton = button.queryByTestId('loading-button');

    expect(loadingButton).toBeTruthy();
  });
});
