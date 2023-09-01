import api from '@config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {runSaga, Saga} from 'redux-saga';

import {login} from '@store/sagas/userSaga';

import {
  LoginRequest,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  User,
} from '@store/slices/userSlice';

describe('userSaga', () => {
  describe('login', () => {
    test('should make login with valid credentials', async () => {
      const validLogin = {
        email: 'validemail@email.com',
        password: '12341234',
      };

      const LoginResponse = {
        id: '1',
        name: 'Neymar Junior',
        birthdate: '01/01/1995',
        gender: 'male',
        email: 'neymar@email.com',
      };

      const dispatchedAction: PayloadAction<LoginRequest>[] = [];

      api.post = jest
        .fn()
        .mockResolvedValueOnce({data: LoginResponse, status: 200});

      await runSaga(
        {
          dispatch: (action: PayloadAction<LoginRequest>) =>
            dispatchedAction.push(action),
        },
        login as unknown as Saga<[{payload: LoginRequest}]>,
        {payload: validLogin},
      ).toPromise();

      const user: User = {
        id: LoginResponse.id,
        name: LoginResponse.name,
        email: LoginResponse.email,

        authorization: undefined,
        refreshToken: undefined,
      };

      expect(api.post).toHaveBeenCalledWith('/auth/sign-in', validLogin);

      expect(dispatchedAction).toContainEqual(
        LOGIN_SUCCESS({data: user, status: 200}),
      );
    });

    test('should not make login with invalid credentials', async () => {
      const invalidLogin = {
        email: 'invalidemail@email.com',
        password: '12341234',
      };

      const errorResponse = {error: 'something went wrong'};

      const dispatchedAction: PayloadAction<LoginRequest>[] = [];

      api.post = jest.fn().mockRejectedValueOnce(errorResponse);

      await runSaga(
        {
          dispatch: (action: PayloadAction<LoginRequest>) =>
            dispatchedAction.push(action),
        },
        login as unknown as Saga<[{payload: LoginRequest}]>,
        {payload: invalidLogin},
      ).toPromise();

      expect(api.post).toHaveBeenCalledWith('/auth/sign-in', invalidLogin);

      expect(dispatchedAction).toContainEqual(
        LOGIN_FAILURE({error: errorResponse}),
      );
    });
  });
});
