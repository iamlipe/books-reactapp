import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface Book {
  id: string;
  authors: string[];
  title: string;
  imageUrl: string;
  pageCount: number;
  publisher: string;
  published: number;
}

export interface BookDetailsResponse {
  authors: string[];
  title: string;
  description: string;
  pageCount: number;
  category: string;
  imageUrl: string;
  language: string;
  isbn10: string;
  isbn13: string;
  publisher: string;
  published: number;
  id: string;
}

export interface BooksResponse {
  data: Book[];
  page: number;
  totalItems: number;
  totalPages: number;
}

export interface BooksRequest {
  page?: string;
  amount?: string;
  title?: string;
  category?: string;
}

export interface BookDetailsRequest {
  id: string;
}

interface BookState {
  isLoading: boolean;
  error: AxiosError | null;
  statusCode: number | null;

  allBooks: BooksResponse | null;
  detailsBook: BookDetailsResponse | null;
}

const initialState: BookState = {
  isLoading: false,
  error: null,
  statusCode: null,

  allBooks: null,
  detailsBook: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    GET_BOOKS: (state, _: PayloadAction<BooksRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),
    GET_BOOKS_SUCCESS: (
      state,
      {
        payload: {data, status},
      }: PayloadAction<{data: BooksResponse; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      error: null,
      statusCode: status,

      allBooks: data,
    }),
    GET_BOOKS_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    GET_DETAILS_BOOK: (state, _: PayloadAction<BookDetailsRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),

    GET_DETAILS_BOOK_SUCCESS: (
      state,
      {
        payload: {data, status},
      }: PayloadAction<{data: BookDetailsResponse; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      error: null,
      statusCode: status,

      detailsBook: data,
    }),

    GET_DETAILS_BOOK_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    REMOVE_DETAILS_BOOK: state => ({
      ...state,

      detailsBook: null,
    }),
  },
});

const {actions, reducer} = bookSlice;

export const bookState = initialState;

export const {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  GET_DETAILS_BOOK,
  GET_DETAILS_BOOK_SUCCESS,
  GET_DETAILS_BOOK_FAILURE,
  REMOVE_DETAILS_BOOK,
} = actions;

export default reducer;
