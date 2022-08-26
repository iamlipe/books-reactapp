import React, {memo} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Book, GET_DETAILS_BOOK} from '@store/slices/bookSlice';

import {useReduxDispatch} from '@hooks/useReduxDispatch';

interface Props {
  item: Book;
}

const {width} = Dimensions.get('window');

const CardBook = ({item}: Props) => {
  const dispatch = useReduxDispatch();

  function handleGetDetailsBook({id}: {id: string}) {
    dispatch(GET_DETAILS_BOOK({id}));
  }

  return (
    <StyledContainer onPress={() => handleGetDetailsBook({id: item.id})}>
      <StyledImage testID="image-book-card" source={{uri: item.imageUrl}} />
      <StyledRow>
        <StyledColumn>
          <StyledTextTitle>
            {item.title.length > 30
              ? `${item.title.substring(0, 30)}...`
              : item.title}
          </StyledTextTitle>
          {item.authors.map((author, index) => (
            <StyledTextAuthor key={index}>
              {item.authors.length - 1 !== index ? `${author},` : author}
            </StyledTextAuthor>
          ))}
        </StyledColumn>

        <StyledColumn>
          <StyledTextInfo>{`${item.pageCount} páginas`}</StyledTextInfo>
          <StyledTextInfo>{`Editora ${item.publisher}`}</StyledTextInfo>
          <StyledTextInfo>{`Publicado em ${item.published}`}</StyledTextInfo>
        </StyledColumn>
      </StyledRow>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  width: 100%;
  height: 160px;

  flex-direction: row;

  background-color: ${({theme}) => theme.colors.WHITE};

  border-radius: 4px;

  padding: 16px;
  margin-bottom: 16px;
`;

const StyledImage = styled.Image`
  width: ${width * 0.9 * 0.28}px;
`;

const StyledRow = styled.View`
  justify-content: space-between;

  padding: 0 16px;
`;

const StyledColumn = styled.View``;

const StyledTextTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_MEDIUM};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.colors.TEXT_DARK};
`;

const StyledTextAuthor = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_REGULAR};
  font-size: ${RFValue(12)}px;

  color: ${({theme}) => theme.colors.TEXT_PRIMARY};
`;

const StyledTextInfo = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_REGULAR};
  font-size: ${RFValue(12)}px;

  color: ${({theme}) => theme.colors.TEXT_GRAY};
`;

export default memo(CardBook);
