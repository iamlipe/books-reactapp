import api from '@config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';
import {useUserStorage} from '@hooks/useUserStorage';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LoginRequest,
  LoginResponse,
  User,
} from '@store/slices/userSlice';

export function* login({payload}: PayloadAction<LoginRequest>) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userStorage = useUserStorage();

    const response: AxiosResponse<LoginResponse> = yield call(
      api.post,
      '/auth/sign-in',
      {
        email: payload.email.toLowerCase(),
        password: payload.password,
      },
    );

    const user: User = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,

      authorization: response.headers?.authorization,
      refreshToken: response.headers?.['refresh-token'],
    };

    yield call(userStorage.save, 'user', user);
    yield put(LOGIN_SUCCESS({data: user, status: 200}));
  } catch (error) {
    yield put(LOGIN_FAILURE({error}));
  }
}

export function* logout() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userStorage = useUserStorage();

    yield call(userStorage.remove, 'user');
    yield put(LOGOUT_SUCCESS());
  } catch (error) {
    yield put(LOGOUT_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(LOGIN, login), takeLatest(LOGOUT, logout)]);
}
