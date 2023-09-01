import reducer, {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
  GET_DETAILS_BOOK,
  GET_DETAILS_BOOK_SUCCESS,
  GET_DETAILS_BOOK_FAILURE,
} from '@store/slices/bookSlice';
import {allBooksMock, detailsBookMock} from '@__mocks__/mockBooks';

describe('bookSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      statusCode: null,

      allBooks: null,
      detailsBook: null,
    });
  });

  test('should handle GET_BOOKS', () => {
    const reducerGetBooks = reducer(
      undefined,
      GET_BOOKS({page: '1', amount: '10'}),
    );

    expect(reducerGetBooks).toEqual({
      isLoading: true,
      error: null,
      statusCode: null,

      allBooks: null,
      detailsBook: null,
    });
  });

  test('should handle GET_BOOKS_SUCCESS', () => {
    const reducerGetBooksSuccess = reducer(
      undefined,
      GET_BOOKS_SUCCESS({data: allBooksMock, status: 200}),
    );

    expect(reducerGetBooksSuccess).toEqual({
      isLoading: false,
      error: null,
      statusCode: 200,

      allBooks: allBooksMock,
      detailsBook: null,
    });
  });

  test('should handle GET_BOOKS_FAILURE', () => {
    const reducerGetBooksFailure = reducer(
      undefined,
      GET_BOOKS_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetBooksFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      statusCode: null,

      allBooks: null,
      detailsBook: null,
    });
  });

  test('should handle GET_DETAILS_BOOK', () => {
    const reducerGetDetailsBook = reducer(
      undefined,
      GET_DETAILS_BOOK({id: '1'}),
    );

    expect(reducerGetDetailsBook).toEqual({
      isLoading: true,
      error: null,
      statusCode: null,

      allBooks: null,
      detailsBook: null,
    });
  });

  test('should handle GET_DETAILS_BOOK_SUCCESS', () => {
    const reducerGetDetailsBookSuccess = reducer(
      undefined,
      GET_DETAILS_BOOK_SUCCESS({data: detailsBookMock, status: 200}),
    );

    expect(reducerGetDetailsBookSuccess).toEqual({
      isLoading: false,
      error: null,
      statusCode: 200,

      allBooks: null,
      detailsBook: detailsBookMock,
    });
  });

  test('should handle GET_DETAILS_BOOK_FAILURE', () => {
    const reducerGetDetailsBookFailure = reducer(
      undefined,
      GET_DETAILS_BOOK_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetDetailsBookFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      statusCode: null,

      allBooks: null,
      detailsBook: null,
    });
  });
});
