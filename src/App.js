import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Bookshelf from 'components/bookshelf';

import { READING, WANT_TO_READ, READ, NONE } from 'utils/shelves';

import './App.css';
import Book from './components/book';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async switchShelf(book, shelf = NONE) {
    const { books } = this.state;

    try {
      await BooksAPI.update(book, shelf);

      books.splice(books.findIndex(b => b.title === book.title), 1, {
        ...book,
        shelf
      });

      this.setState({ books });

    } catch (ex) {
      alert('An error occurred, please try again later.');
    }
  }

  async componentDidMount() {
    try {
      const books = await BooksAPI.getAll();

      this.setState({
        books: books.map(({ title, authors, shelf, imageLinks, id }) => ({
            id,
            title,
            authors: [...authors],
            shelf,
            imageUrl: imageLinks.smallThumbnail || 'http://via.placeholder.com/350x150'
          }))
      });

    } catch (ex) {
      alert('An error occurred, please try again later.');
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title='Currently Reading'>
                  {books.filter(book => book.shelf === READING).map(book => (
                    <li key={book.title}>
                      <Book
                        title={book.title}
                        authors={book.authors}
                        imageUrl={book.imageUrl}
                        shelf={book.shelf}
                        switchShelf={shelf => this.switchShelf(book, shelf)} />
                    </li>
                  ))}
                </Bookshelf>
                <Bookshelf title='Want to Read'>
                  {books.filter(book => book.shelf === WANT_TO_READ).map(book => (
                    <li key={book.title}>
                      <Book
                        title={book.title}
                        authors={book.authors}
                        imageUrl={book.imageUrl}
                        shelf={book.shelf}
                        switchShelf={shelf => this.switchShelf(book, shelf)} />
                    </li>
                  ))}
                </Bookshelf>
                <Bookshelf title='Read'>
                  {books.filter(book => book.shelf === READ).map(book => (
                    <li key={book.title}>
                      <Book
                        title={book.title}
                        authors={book.authors}
                        imageUrl={book.imageUrl}
                        shelf={book.shelf}
                        switchShelf={shelf => this.switchShelf(book, shelf)} />
                    </li>
                  ))}
                </Bookshelf>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">

                  {/* NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms. */}

                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default BooksApp
