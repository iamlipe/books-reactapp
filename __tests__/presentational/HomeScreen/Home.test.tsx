import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@config/functions/Testing';
import {allBooksMock} from '@__mocks__/mockBooks';

import {Home} from '@presentational/HomeScreen/Home';

describe('Home', () => {
  test('should render correctly', () => {
    renderWithThemeProvider(<Home />, {book: {allBooks: allBooksMock}});
  });

  test('should match snapshot', () => {
    matchSnapshotWithProvider(<Home />, {book: {allBooks: allBooksMock}});
  });

  test('should render all cards', () => {
    const home = renderWithThemeProvider(<Home />, {
      book: {allBooks: allBooksMock},
    });

    const allCardBook = home.getAllByTestId('card-book');

    expect(allCardBook.length).toEqual(allBooksMock.data.length);
  });

  test('should render current page and total page', () => {
    const home = renderWithThemeProvider(<Home />, {
      book: {allBooks: allBooksMock},
    });

    const currentPage = home.getByTestId('current-page');
    const totalPages = home.getByTestId('total-pages');

    expect(currentPage.props.children).toContain(`${allBooksMock.page}`);
    expect(totalPages.props.children).toContain(`${allBooksMock.totalPages}`);
  });
});
