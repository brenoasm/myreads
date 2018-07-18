import React, { Component } from 'react';

class Book extends Component {
  static defaultProps = {
      height: 193,
      width: 128,
      imageUrl: 'http://via.placeholder.com/350x150',
      title: '',
      authors: ''
  }

  render() {

    const { width, height, imageUrl, title, authors } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
            style={{ width: width, height: height, backgroundImage: imageUrl }}>
          </div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
};

export default Book;