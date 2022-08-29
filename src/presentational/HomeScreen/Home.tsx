import React, {useEffect, useMemo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {LOGOUT} from '@store/slices/userSlice';
import {GET_BOOKS} from '@store/slices/bookSlice';

import {useReduxDispatch} from '@hooks/useReduxDispatch';
import {useReduxSelector} from '@hooks/useReduxSelector';

import background from '@assets/images/background_home.png';

import Logo from '@assets/svgs/dark_logo.svg';

import CardBook from './CardBook';
import ModalBook from './ModalBook';

StatusBar.setBarStyle('dark-content');

const {height} = Dimensions.get('window');

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {allBooks} = useReduxSelector(state => state.book);
  const theme = useTheme();
  const dispatch = useReduxDispatch();

  function handleGetBooks({page}: {page: number}) {
    dispatch(GET_BOOKS({page: `${page}`, amount: '10'}));
  }

  function handleLogout() {
    dispatch(LOGOUT());
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleGetBooks({page: currentPage}), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleGetBooks({page: currentPage}), [currentPage]);

  const renderLoading = useMemo(() => {
    return (
      <StyledContainerLoading>
        <StyledLoading size="small" color={theme.colors.PRIMARY_500} />
        <StyledTextLoading>Carregando...</StyledTextLoading>
      </StyledContainerLoading>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = useMemo(() => {
    return (
      <>
        <StyledContainerListBooks showsVerticalScrollIndicator={false}>
          {allBooks?.data.map(item => (
            <CardBook key={item.id} item={item} />
          ))}
        </StyledContainerListBooks>

        <StyledCointainerPagination>
          <StyledBaseButton
            disabled={currentPage <= 1}
            onPress={() => {
              const newPage = currentPage - 1;

              if (newPage >= 1) {
                setCurrentPage(newPage);
              }
            }}>
            <StyledBackIcon name="arrow-back-ios" size={16} color="#333" />
          </StyledBaseButton>
          <StyledTextPagination>
            Página
            <StyledTextPaginationStrong testID="current-page">{` ${allBooks?.page} `}</StyledTextPaginationStrong>
            de
            <StyledTextPaginationStrong testID="total-pages">{` ${allBooks?.totalPages}`}</StyledTextPaginationStrong>
          </StyledTextPagination>
          <StyledBaseButton
            disabled={
              allBooks?.totalPages && currentPage >= allBooks?.totalPages
            }
            onPress={() => {
              const newPage = currentPage + 1;
              const totalPages = allBooks?.totalPages;

              if (totalPages && newPage <= totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}>
            <StyledNextIcon name="arrow-forward-ios" size={16} color="#333" />
          </StyledBaseButton>
        </StyledCointainerPagination>
      </>
    );
  }, [allBooks, currentPage]);

  return (
    <StyledBackground source={background}>
      <StyledContainer>
        <ModalBook />
        <StyledRow>
          <StyledLogo />
          <StyledBaseButton onPress={() => handleLogout()}>
            <Icon name="logout" size={16} color="#333" />
          </StyledBaseButton>
        </StyledRow>
        {allBooks ? renderContent : renderLoading}
      </StyledContainer>
    </StyledBackground>
  );
};

const StyledBackground = styled.ImageBackground`
  min-height: 100%;

  align-items: center;
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLogo = styled(Logo)``;

const StyledContainer = styled.SafeAreaView`
  width: 90%;

  padding-top: 36px;
  padding-bottom: 16px;
  margin-top: ${StatusBar.currentHeight}px;
`;

const StyledContainerListBooks = styled.ScrollView`
  height: ${StatusBar.currentHeight &&
  height -
    (StatusBar.currentHeight + 36 + 40 + 16 + 16 + 16 + height * 0.05)}px;

  margin-top: 16px;
`;

const StyledCointainerPagination = styled.View`
  height: 10%;

  flex-direction: row;

  align-self: center;
  align-items: center;
`;

const StyledBaseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;

  align-items: center;
  justify-content: center;

  border-radius: 16px;
  border: 1px solid ${({theme}) => theme.colors.BLACK_TRANSPARENT};
`;

const StyledTextPagination = styled.Text`
  margin: 0 10px;
`;

const StyledTextPaginationStrong = styled(StyledTextPagination)`
  font-family: ${({theme}) => theme.fonts.HEEBO_MEDIUM};
`;

const StyledContainerLoading = styled.View`
  height: ${StatusBar.currentHeight &&
  height -
    (StatusBar.currentHeight + 36 + 40 + 16 + 16 + 16 + height * 0.05)}px;

  align-items: center;
  justify-content: center;
`;

const StyledLoading = styled.ActivityIndicator`
  margin-bottom: 6px;
`;

const StyledTextLoading = styled.Text`
  font-family: ${({theme}) => theme.fonts.HEEBO_REGULAR};
  font-size: ${RFValue(14)}px;
`;

const StyledBackIcon = styled(Icon)`
  margin-right: -5px;
`;

const StyledNextIcon = styled(Icon)`
  margin-left: 2px;
`;
