import api from '@config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {
  BookDetailsRequest,
  BookDetailsResponse,
  BooksRequest,
  BooksResponse,
  GET_BOOKS,
  GET_BOOKS_FAILURE,
  GET_BOOKS_SUCCESS,
  GET_DETAILS_BOOK,
  GET_DETAILS_BOOK_SUCCESS,
  GET_DETAILS_BOOK_FAILURE,
} from '../slices/bookSlice';

export function* getAllBooks({payload}: PayloadAction<BooksRequest>) {
  try {
    const {data, status}: AxiosResponse<BooksResponse> = yield call(
      api.get,
      `/books?page=${payload.page}&amount=${payload.amount}`,
    );

    yield put(GET_BOOKS_SUCCESS({data, status}));
  } catch (error) {
    yield put(GET_BOOKS_FAILURE({error}));
  }
}

export function* getDetailsBook({payload}: PayloadAction<BookDetailsRequest>) {
  try {
    const {data, status}: AxiosResponse<BookDetailsResponse> = yield call(
      api.get,
      `/books/${payload.id}`,
    );

    yield put(GET_DETAILS_BOOK_SUCCESS({data, status}));
  } catch (error) {
    yield put(GET_DETAILS_BOOK_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(GET_BOOKS, getAllBooks),
    takeLatest(GET_DETAILS_BOOK, getDetailsBook),
  ]);
}
