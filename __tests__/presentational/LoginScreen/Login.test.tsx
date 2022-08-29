import React from 'react';
import {act, fireEvent} from '@testing-library/react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';

import {Login} from '@presentational/LoginScreen/Login';

describe('Login', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<Login />);
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<Login />);
  });

  test('should submit form', async () => {
    const login = renderWithThemeProvider(<Login />);

    const inputEmail = login.getByTestId('input-text-email');
    const inputPassword = login.getByTestId('input-text-password');
    const submitButton = login.getByTestId('submit-button');

    fireEvent.changeText(inputEmail, 'test@email.com');
    fireEvent.changeText(inputPassword, 'passowrd');

    await act(() => fireEvent.press(submitButton));

    expect(inputEmail.props.value).toEqual('test@email.com');
    expect(inputPassword.props.value).toEqual('passowrd');
  });
});
