import React, {memo} from 'react';
import styled from 'styled-components/native';

import WarningBox from '@assets/svgs/warning-box.svg';

interface Props {
  error: string;
}

const Warning = ({error}: Props) => {
  return (
    <StyledWarningContainer>
      <StyledWarningBox />
      <StyledText>{error}</StyledText>
    </StyledWarningContainer>
  );
};

const StyledWarningContainer = styled.View`
  width: 70%;
  max-width: 239px;
  height: 48px;

  align-items: center;
  justify-content: center;

  padding: 12px 8px 8px 8px;
`;

const StyledWarningBox = styled(WarningBox)`
  position: absolute;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.colors.TEXT_LIGHT};
`;

export default memo(Warning);
