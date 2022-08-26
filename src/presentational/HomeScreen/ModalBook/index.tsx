/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import {Overlay} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {REMOVE_DETAILS_BOOK} from '@store/slices/bookSlice';

import {useReduxSelector} from '@hooks/useReduxSelector';
import {useReduxDispatch} from '@hooks/useReduxDispatch';

import Aspas from '@assets/svgs/aspas.svg';

const {width, height} = Dimensions.get('window');

const ModalBook = () => {
  const {detailsBook} = useReduxSelector(state => state.book);
  const dispatch = useReduxDispatch();

  function handleRemoveDetailsBook() {
    dispatch(REMOVE_DETAILS_BOOK());
  }

  return (
    <>
      {detailsBook && <StyledBackground />}
      <StyledOverlay
        isVisible={!!detailsBook}
        onBackdropPress={handleRemoveDetailsBook}
        backdropStyle={{backgroundColor: 'transparent'}}
        fullScreen={false}
        overlayStyle={{
          width: width * 0.9,
          height: height * 0.85,
          marginTop: height * 0.05,
        }}>
        <StyledBaseButton onPress={handleRemoveDetailsBook}>
          <Icon name="close" size={16} color="#333" />
        </StyledBaseButton>

        <StyledContainerScroll showsVerticalScrollIndicator={false}>
          <StyledImage source={{uri: detailsBook?.imageUrl}} />

          <StyledTextTitle>
            {detailsBook && detailsBook.title.length > 35
              ? `${detailsBook?.title.substring(0, 35)}...`
              : detailsBook?.title}
          </StyledTextTitle>

          <StyledRowAuthors>
            {detailsBook?.authors.map((author, index) => (
              <StyledTextAuthors key={index}>
                {detailsBook.authors.length - 1 !== index
                  ? `${author}, `
                  : author}
              </StyledTextAuthors>
            ))}
          </StyledRowAuthors>

          <StyledTextSectionTitle>Informações</StyledTextSectionTitle>

          <StyledRowInfo>
            <StyledTextInfoTitle>Páginas</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.pageCount}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>Editora</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.publisher}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>Publicação</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.published}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>Idioma</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.language}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>Título Original</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.title}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>ISBN-10</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.isbn10}</StyledTextInfo>
          </StyledRowInfo>

          <StyledRowInfo>
            <StyledTextInfoTitle>ISBN-13</StyledTextInfoTitle>
            <StyledTextInfo>{detailsBook?.isbn13}</StyledTextInfo>
          </StyledRowInfo>

          <StyledTextSectionTitle>Resenha da editora</StyledTextSectionTitle>
          <StyledRowDescription>
            <StyledTextInfo>
              <StyledAspas /> {`  ${detailsBook?.description}`}
            </StyledTextInfo>
          </StyledRowDescription>
        </StyledContainerScroll>
      </StyledOverlay>
    </>
  );
};

const StyledBackground = styled.View`
  position: absolute;
  left: -20px;

  z-index: 1;

  width: ${width}px;
  height: ${height}px;

  background-color: ${({theme}) => theme.colors.BLACK};

  opacity: 0.4;
`;

const StyledOverlay = styled(Overlay)``;

const StyledImage = styled.Image`
  height: 412px;
  width: 100%;

  align-self: center;

  margin-bottom: 24px;
`;

const StyledContainerScroll = styled.ScrollView`
  height: 200px;

  padding: 16px;
`;

const StyledRowInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledRowAuthors = styled(StyledRowInfo)`
  justify-content: flex-start;
`;

const StyledRowDescription = styled(StyledRowAuthors)``;

const StyledAspas = styled(Aspas)``;

const StyledTextTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_MEDIUM};
  font-size: ${RFValue(28)}px;

  color: ${({theme}) => theme.colors.TEXT_DARK};
`;

const StyledTextAuthors = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_REGULAR};
  font-size: ${RFValue(12)}px;

  color: ${({theme}) => theme.colors.TEXT_PRIMARY};
`;

const StyledTextSectionTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_MEDIUM};
  font-size: ${RFValue(12)}px;

  color: ${({theme}) => theme.colors.TEXT_DARK};

  text-transform: uppercase;

  margin: 32px 0 12px 0;
`;

const StyledTextInfoTitle = styled(StyledTextSectionTitle)`
  line-height: 20px;

  text-transform: none;

  margin: 0;
`;

const StyledTextInfo = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_REGULAR};
  font-size: ${RFValue(12)}px;

  color: ${({theme}) => theme.colors.TEXT_GRAY};
`;

const StyledBaseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${-height * 0.06}px;
  right: 0;

  width: 32px;
  height: 32px;

  align-items: center;
  justify-content: center;

  background-color: ${({theme}) => theme.colors.WHITE};

  border-radius: 16px;
  border: 1px solid ${({theme}) => theme.colors.BLACK_TRANSPARENT};
`;

export default memo(ModalBook);
