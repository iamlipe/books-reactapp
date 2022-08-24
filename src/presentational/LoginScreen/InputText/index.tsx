import React, {memo, forwardRef} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {ReturnKeyTypeOptions, TextInputProps} from 'react-native';
import {useController} from 'react-hook-form';

interface Props extends TextInputProps {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
  onSubmitEditing?: () => void;
  submitButton?: () => JSX.Element;
}

const InputText = forwardRef(
  (
    {
      name,
      control,
      label,
      placeholder,
      secureTextEntry = false,
      onSubmitEditing = () => null,
      returnKeyType = undefined,
      submitButton: SubmitButton,
    }: Props,
    ref,
  ) => {
    const theme = useTheme();

    const {
      field: {onChange, value},
    } = useController({name, control});

    return (
      <StyledContainer>
        <StyledBackground />
        <StyledContainerInput>
          <StyledRow>
            <StyledColumn>
              <StyledLabel>{label}</StyledLabel>
              <StyledInput
                ref={ref}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.TEXT_LIGHT_TRANSPARENT}
                onChangeText={onChange}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={secureTextEntry}
                returnKeyType={returnKeyType}
                value={value}
              />
            </StyledColumn>
            {SubmitButton ? <SubmitButton /> : null}
          </StyledRow>
        </StyledContainerInput>
      </StyledContainer>
    );
  },
);

const StyledContainer = styled.View`
  width: 100%;
  height: 60px;

  align-self: center;

  margin-bottom: 16px;
`;

const StyledBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 4px;

  background-color: ${({theme}) => theme.colors.BLACK};
  opacity: 0.32;
`;

const StyledContainerInput = styled.View`
  height: 100%;

  padding: 6px 16px;
`;

const StyledInput = styled.TextInput`
  flex: 1;

  height: 24px;

  color: ${({theme}) => theme.colors.TEXT_LIGHT};

  padding: 0;
`;

const StyledLabel = styled.Text`
  color: ${({theme}) => theme.colors.TEXT_DARK_TRANSPARENT};

  line-height: 16px;
`;

const StyledRow = styled.View`
  height: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledColumn = styled.View`
  min-width: 60%;
`;

export default memo(InputText);
