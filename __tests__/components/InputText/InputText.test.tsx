import React from 'react';
import {Button} from 'react-native';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';

import InputText from '@presentational/LoginScreen/InputText';

const buttonSubmit = () => {
  return <Button testID="button-submit" title="buttonSubmit" />;
};

jest.mock('react-hook-form', () => ({
  useController: () => ({
    field: {
      onChange: jest.fn(),
    },
  }),
}));

describe('InputText', () => {
  const control = jest.fn();
  const name = 'inputName';
  const label = 'inputLabel';
  const placeholder = 'inputPlaceholder';

  test('should render correctly', () => {
    renderWithThemeProvider(
      <InputText
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
      />,
    );
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(
      <InputText
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
      />,
    );
  });

  test('should render text label', () => {
    const inputText = renderWithThemeProvider(
      <InputText
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
      />,
    );

    const labelInput = inputText.queryByText(label);

    expect(labelInput).toBeTruthy();
  });

  test('should render placeholder', () => {
    const inputText = renderWithThemeProvider(
      <InputText
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
      />,
    );

    const input = inputText.getByTestId(`input-text-${name}`);

    expect(input.props.placeholder).toEqual(placeholder);
  });

  test('should render submitButton', () => {
    const inputText = renderWithThemeProvider(
      <InputText
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
        submitButton={buttonSubmit}
      />,
    );

    const buttonSubmitInput = inputText.queryByTestId('button-submit');

    expect(buttonSubmitInput).toBeTruthy();
  });
});
