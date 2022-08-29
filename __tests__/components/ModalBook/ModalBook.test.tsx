import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';
import {detailsBook} from '@__mocks__/mockBooks';

import ModalBook from '@presentational/HomeScreen/ModalBook';

describe('ModalBook', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<ModalBook />, {
      book: {detailsBook},
    });
  });

  test('should render imageBook', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });

    const imageBook = modalBook.queryByTestId('image-book-modal');

    expect(imageBook).toBeTruthy();
  });

  test('should render title', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });

    const titleModalBook = modalBook.queryAllByText(detailsBook.title);

    expect(titleModalBook.length).toEqual(2);
  });

  test('should render authors', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });

    detailsBook.authors.forEach(author => {
      const authorModalBook = modalBook.queryByText(author);

      expect(authorModalBook).toBeTruthy();
    });
  });

  test('should render Paperback', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const paperbackModalBook = modalBook.queryByText(
      `${detailsBook.pageCount}`,
    );

    expect(paperbackModalBook).toBeTruthy();
  });

  test('should render Publisher', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const publisherModalBook = modalBook.queryByText(detailsBook.publisher);

    expect(publisherModalBook).toBeTruthy();
  });

  test('should render Published', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const publishedModalBook = modalBook.queryByText(
      `${detailsBook.published}`,
    );

    expect(publishedModalBook).toBeTruthy();
  });

  test('should render Language', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const languageModalBook = modalBook.queryByText(detailsBook.language);

    expect(languageModalBook).toBeTruthy();
  });

  test('should render isbn10', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const isbn10ModalBook = modalBook.queryByText(detailsBook.isbn10);

    expect(isbn10ModalBook).toBeTruthy();
  });

  test('should render isbn13', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const isbn13ModalBook = modalBook.queryByText(detailsBook.isbn13);

    expect(isbn13ModalBook).toBeTruthy();
  });

  test('should render Description', () => {
    const modalBook = renderWithThemeProvider(<ModalBook />, {
      book: {detailsBook},
    });
    const descriptionModalBook = modalBook.queryByText(detailsBook.description);

    expect(descriptionModalBook).toBeTruthy();
  });
});
