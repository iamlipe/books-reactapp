import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';
import {BookDetailsResponse} from '@store/slices/bookSlice';

import ModalBook from '@presentational/HomeScreen/ModalBook';

describe('ModalBook', () => {
  const detailsBook: BookDetailsResponse = {
    id: '1',
    title: 'Memórias Póstumas de Brás Cubas',
    authors: ['Machado de Assis'],
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41ZS6DFo+vL._SX328_BO1,204,203,200_.jpg',
    pageCount: 159,
    publisher: 'Saraiva',
    published: 2019,
    category: 'romance',
    description:
      'A publicação desta obra não só inaugura o Realismo no Brasil, como inicia a etapa mais complexa da obra de Machado de Assis. Com ela, aprofunda-se a sua análise da realidade e refina-se a sua linguagem, sendo considerada a obra que prenuncia algumas técnicas da literatura moderna.',
    language: 'português',
    isbn10: '8502082191',
    isbn13: '978-8502082199',
  };

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
