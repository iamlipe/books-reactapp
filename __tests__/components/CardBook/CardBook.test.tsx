import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';
import {Book} from '@store/slices/bookSlice';

import CardBook from '@presentational/HomeScreen/CardBook';

describe('CardBook', () => {
  const item: Book = {
    id: '1',
    title: 'Memórias Póstumas de Brás Cubas',
    authors: ['Machado de Assis'],
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41ZS6DFo+vL._SX328_BO1,204,203,200_.jpg',
    pageCount: 159,
    publisher: 'Saraiva',
    published: 2019,
  };

  test('should render correctly', () => {
    renderWithThemeProvider(<CardBook item={item} />);
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<CardBook item={item} />);
  });

  test('should render imageBook', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    const imageBook = cardBook.queryByTestId('image-book-card');

    expect(imageBook).toBeTruthy();
  });

  test('should render title', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    const titleCardBook = cardBook.queryByText(
      item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title,
    );

    expect(titleCardBook).toBeTruthy();
  });

  test('should render all authors', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    item.authors.forEach(author => {
      const authorCardBook = cardBook.queryByText(author);

      expect(authorCardBook).toBeTruthy();
    });
  });

  test('should render Paperback', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    const paperbackCardBook = cardBook.queryByText(`${item.pageCount} páginas`);

    expect(paperbackCardBook).toBeTruthy();
  });

  test('should render publisher', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    const publisherCardBook = cardBook.queryByText(`Editora ${item.publisher}`);

    expect(publisherCardBook).toBeTruthy();
  });

  test('should render published', () => {
    const cardBook = renderWithThemeProvider(<CardBook item={item} />);

    const publishedCardBook = cardBook.queryByText(
      `Publicado em ${item.published}`,
    );

    expect(publishedCardBook).toBeTruthy();
  });
});
