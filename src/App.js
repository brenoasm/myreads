import React from "react";
import { withRouter } from "react-router";
import { Route, Link, Switch } from "react-router-dom";
import Bookshelf from "components/bookshelf";
import { READING, WANT_TO_READ, READ, NONE } from "utils/shelves";
import { IMAGE_PLACEHOLDER, ERROR_MESSAGE } from "utils/defaults";
import Book from "./components/book";
import * as BooksAPI from "./BooksAPI";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    searchQuery: ""
  };

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }

  findBook(id) {
    const { books } = this.state;

    return books.find(book => book.id === id);
  }

  clearSearchedBooks() {
    this.setState({ searchedBooks: [] });
  }

  async switchShelf(book, shelf = NONE) {
    const { books } = this.state;

    try {
      await BooksAPI.update(book, shelf);

      books.splice(books.findIndex(b => b.title === book.title), 1, {
        ...book,
        shelf
      });

      this.setState({ books, searchQuery: '', searchedBooks: [] });
    } catch (err) {
      alert(ERROR_MESSAGE); //eslint-disable-line
    }
  }

  async searchBooks(searchQuery) {
    if (searchQuery === "") {
      this.setState({ searchedBooks: [] });

      return;
    }

    try {
      const books = await BooksAPI.search(searchQuery);

      if (books.length) {
        this.setState({
          searchedBooks: books.map(
            ({ title, authors = [], imageLinks = {}, id }) => {
              const book = this.findBook(id);

              return {
                id,
                title,
                authors: authors.length ? [...authors] : [],
                shelf: book ? book.shelf : undefined,
                imageUrl: imageLinks.smallThumbnail || IMAGE_PLACEHOLDER
              };
            }
          )
        });
      }
    } catch (err) {
      alert(ERROR_MESSAGE); //eslint-disable-line
    }
  }

  async componentDidMount() {
    try {
      const books = await BooksAPI.getAll();

      if (books.length) {
        this.setState({
          books:
            books &&
            books.map(({ title, authors, shelf, imageLinks, id }) => ({
              id,
              title,
              authors: [...authors],
              shelf,
              imageUrl: imageLinks.smallThumbnail || IMAGE_PLACEHOLDER
            }))
        });
      }
    } catch (err) {
      alert(ERROR_MESSAGE); //eslint-disable-line
    }
  }

  render() {
    const { books, searchedBooks, searchQuery } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf title="Currently Reading">
                      {books
                        .filter(book => book.shelf === READING)
                        .map(book => (
                          <li key={`${book.id}-${book.shelf}-${Math.random()}`}>
                            <Book
                              title={book.title}
                              authors={book.authors}
                              imageUrl={book.imageUrl}
                              shelf={book.shelf}
                              switchShelf={shelf =>
                                this.switchShelf(book, shelf)
                              }
                            />
                          </li>
                        ))}
                    </Bookshelf>
                    <Bookshelf title="Want to Read">
                      {books
                        .filter(book => book.shelf === WANT_TO_READ)
                        .map(book => (
                          <li key={`${book.id}-${book.shelf}-${Math.random()}`}>
                            <Book
                              title={book.title}
                              authors={book.authors}
                              imageUrl={book.imageUrl}
                              shelf={book.shelf}
                              switchShelf={shelf =>
                                this.switchShelf(book, shelf)
                              }
                            />
                          </li>
                        ))}
                    </Bookshelf>
                    <Bookshelf title="Read">
                      {books.filter(book => book.shelf === READ).map(book => (
                        <li key={`${book.id}-${book.shelf}-${Math.random()}`}>
                          <Book
                            title={book.title}
                            authors={book.authors}
                            imageUrl={book.imageUrl}
                            shelf={book.shelf}
                            switchShelf={shelf => this.switchShelf(book, shelf)}
                          />
                        </li>
                      ))}
                    </Bookshelf>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search" onClick={() => this.clearSearchedBooks()}>
                    Add a book
                  </Link>
                </div>
              </div>
            )}
          />
          <Route
            path="/search"
            render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to="/">
                    Close
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={searchQuery}
                      onChange={event => {
                        this.setSearchQuery(event.target.value);
                        this.searchBooks(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <Bookshelf>
                    {searchedBooks.map((book, index) => (
                      <li key={`${book.id}-${book.shelf}-${index}`}>
                        <Book
                          title={book.title}
                          authors={book.authors}
                          imageUrl={book.imageUrl}
                          shelf={book.shelf}
                          switchShelf={shelf => this.switchShelf(book, shelf)}
                        />
                      </li>
                    ))}
                  </Bookshelf>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(BooksApp);
