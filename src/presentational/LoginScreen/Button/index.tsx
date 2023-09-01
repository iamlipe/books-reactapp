import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components/native';

interface Props {
  testID: string;
  title: string;
  loading?: boolean;
  onPress: () => void;
}

const Button = ({testID, title, loading = false, onPress}: Props) => {
  const theme = useTheme();

  return (
    <StyledContainer testID={testID} onPress={onPress}>
      {loading ? (
        <StyledLoading
          testID="loading-button"
          size="small"
          color={theme.colors.PRIMARY_500}
        />
      ) : (
        <StyledText>{title}</StyledText>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: 85px;
  height: 35px;

  align-items: center;
  justify-content: center;

  border-radius: 44px;

  background-color: ${({theme}) => theme.colors.WHITE};
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.colors.PRIMARY_500};
`;

const StyledLoading = styled.ActivityIndicator``;

export default memo(Button);
