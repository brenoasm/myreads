import React, { Component } from 'react';
import Book from '../book';

class Bookshelf extends Component {
  render() {
    const { title, books } = this.props; 

    return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books && books.map(book => (
                <li>
                  <Book 
                    title={book.title}
                    authors={book.authors}
                    imageUrl={book.imageUrl} />
                </li>
              ))}
            </ol>
          </div>
        </div>
    );
  }
};

export default Bookshelf;