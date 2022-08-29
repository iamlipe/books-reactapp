import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  birthdate: string;
  gender: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  authorization: string | undefined;
  refreshToken: string | undefined;
}

interface UserState {
  isLoading: boolean;
  auth: User | null;
  error: AxiosError | null;
  statusCode: number | null;
}

const initialState: UserState = {
  isLoading: false,
  auth: null,
  error: null,
  statusCode: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN: (state, _: PayloadAction<LoginRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),
    LOGIN_SUCCESS: (
      state,
      {payload: {data, status}}: PayloadAction<{data: User; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      auth: data,
      statusCode: status,
    }),
    LOGIN_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    LOGOUT: (state, _: PayloadAction) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    LOGOUT_SUCCESS: () => ({
      ...initialState,
    }),
    LOGOUT_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),
  },
});

const {actions, reducer} = userSlice;

export const userState = initialState;

export const {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} = actions;
export default reducer;
