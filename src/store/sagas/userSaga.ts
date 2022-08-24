import api from '@config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequest,
  LoginResponse,
  User,
} from '@store/slices/userSlice';

export function* login({payload}: PayloadAction<LoginRequest>) {
  try {
    const {data}: AxiosResponse<LoginResponse> = yield call(
      api.post,
      '/auth/sign-in',
      {
        email: payload.email.toLowerCase(),
        password: payload.password,
      },
    );

    const user: User = {
      id: data.id,
      name: data.name,
    };

    yield put(LOGIN_SUCCESS({data: user, status: 200}));
  } catch (error) {
    yield put(LOGIN_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(LOGIN, login)]);
}
