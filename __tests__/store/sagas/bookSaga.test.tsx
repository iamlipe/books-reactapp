import api from '@config/services/api';
import {getAllBooks, getDetailsBook} from '@store/sagas/bookSaga';
import {PayloadAction} from '@reduxjs/toolkit';
import {runSaga, Saga} from 'redux-saga';
import {allBooksMock, detailsBook} from '@__mocks__/mockBooks';

import {
  BookDetailsRequest,
  BooksRequest,
  BooksResponse,
  GET_BOOKS_FAILURE,
  GET_BOOKS_SUCCESS,
  GET_DETAILS_BOOK_FAILURE,
  GET_DETAILS_BOOK_SUCCESS,
} from '@store/slices/bookSlice';

describe('bookSaga', () => {
  describe('get all books', () => {
    test('should return allBooks', async () => {
      const validRequest = {
        page: '1',
        amount: '1',
      };

      const dispatchedAction: PayloadAction<BooksResponse>[] = [];

      api.get = jest
        .fn()
        .mockResolvedValueOnce({data: allBooksMock, status: 200});

      await runSaga(
        {
          dispatch: (action: PayloadAction<BooksResponse>) =>
            dispatchedAction.push(action),
        },
        getAllBooks as unknown as Saga<[{payload: BooksRequest}]>,
        {payload: {page: validRequest.page, amount: validRequest.amount}},
      ).toPromise();

      expect(api.get).toHaveBeenCalledWith(
        `/books?page=${validRequest.page}&amount=${validRequest.amount}`,
      );

      expect(dispatchedAction).toContainEqual(
        GET_BOOKS_SUCCESS({data: allBooksMock, status: 200}),
      );
    });

    test('should not return allBooks', async () => {
      const invalidRequest = {
        page: '2432423',
        amount: '121423242',
      };

      const responseError = {error: 'something went wrong'};

      const dispatchedAction: PayloadAction<BooksResponse>[] = [];

      api.get = jest.fn().mockRejectedValueOnce(responseError);

      await runSaga(
        {
          dispatch: (action: PayloadAction<BooksResponse>) =>
            dispatchedAction.push(action),
        },
        getAllBooks as unknown as Saga<[{payload: BooksRequest}]>,
        {payload: {page: invalidRequest.page, amount: invalidRequest.amount}},
      ).toPromise();

      expect(api.get).toHaveBeenCalledWith(
        `/books?page=${invalidRequest.page}&amount=${invalidRequest.amount}`,
      );

      expect(dispatchedAction).toContainEqual(
        GET_BOOKS_FAILURE({error: responseError}),
      );
    });
  });

  describe('get details book', () => {
    test('should return detailsBook', async () => {
      const validBook = {
        id: '1',
      };

      const dispatchedAction: PayloadAction<BookDetailsRequest>[] = [];

      api.get = jest
        .fn()
        .mockResolvedValueOnce({data: detailsBook, status: 200});

      await runSaga(
        {
          dispatch: (action: PayloadAction<BookDetailsRequest>) =>
            dispatchedAction.push(action),
        },
        getDetailsBook as unknown as Saga<[{payload: BookDetailsRequest}]>,
        {payload: validBook},
      ).toPromise();

      expect(api.get).toHaveBeenCalledWith(`/books/${validBook.id}`);

      expect(dispatchedAction).toContainEqual(
        GET_DETAILS_BOOK_SUCCESS({data: detailsBook, status: 200}),
      );
    });

    test('should not return detailsBook', async () => {
      const invalidBook = {
        id: '-1',
      };

      const responseError = {error: 'something went wrong'};

      const dispatchedAction: PayloadAction<BookDetailsRequest>[] = [];

      api.get = jest.fn().mockRejectedValueOnce(responseError);

      await runSaga(
        {
          dispatch: (action: PayloadAction<BookDetailsRequest>) =>
            dispatchedAction.push(action),
        },
        getDetailsBook as unknown as Saga<[{payload: BookDetailsRequest}]>,
        {payload: invalidBook},
      ).toPromise();

      expect(api.get).toHaveBeenCalledWith(`/books/${invalidBook.id}`);

      expect(dispatchedAction).toContainEqual(
        GET_DETAILS_BOOK_FAILURE({error: responseError}),
      );
    });
  });
});
