import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import {StatusBar, Keyboard, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginRequest} from '@store/slices/userSlice';
import {LOGIN} from '@store/slices/userSlice';

import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useReduxDispatch} from '@hooks/useReduxDispatch';
import {useReduxSelector} from '@hooks/useReduxSelector';

import Logo from '@assets/svgs/logo.svg';

import backgroud from '@assets/images/backgroud_login.png';

import InputText from './InputText';
import Button from './Button';
import Warning from './Warning';

export const Login = () => {
  const passwordRef = useRef<TextInput>(null);
  const [showError, setShowError] = useState(false);
  const {isLoading, error} = useReduxSelector(state => state.user);
  const {t} = useTranslation();
  const dispatch = useReduxDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('error.validEmail'))
      .required(t('error.required')),
    password: Yup.string().required(t('error.required')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  function handleLogin(data: LoginRequest) {
    dispatch(LOGIN(data));
  }

  function onSubmit(data: LoginRequest) {
    handleLogin(data);

    Keyboard.dismiss();
  }

  useEffect(() => {
    if (error) {
      setShowError(true);

      setTimeout(() => setShowError(false), 5000);
    }
  }, [error]);

  return (
    <StyledBackground source={backgroud}>
      <StyledContainer>
        <StyledLogo />
        <InputText
          name="email"
          control={control}
          label={t('label.email')}
          keyboardType="email-address"
          placeholder="books@ioasys.com.br"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <InputText
          ref={passwordRef}
          name="password"
          control={control}
          label={t('label.password')}
          placeholder="********"
          returnKeyType="send"
          onSubmitEditing={handleSubmit(onSubmit)}
          secureTextEntry
          submitButton={() => (
            <Button
              title={t('button.login')}
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />
          )}
        />

        {(showError || errors.email?.message || errors.password?.message) && (
          <Warning
            error={
              errors.email?.message ||
              errors.password?.message ||
              'Email e/ou senha incorretos.'
            }
          />
        )}
      </StyledContainer>
    </StyledBackground>
  );
};

const StyledBackground = styled.ImageBackground`
  min-height: 100%;

  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 16px;
`;

const StyledContainer = styled.SafeAreaView`
  width: 90%;

  margin-top: ${StatusBar.currentHeight}px;
`;
