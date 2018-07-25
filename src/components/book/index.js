import React, { Component } from 'react';

import Select from 'components/select';
import Option from 'components/select-option';

import { READING, WANT_TO_READ, READ, NONE } from 'utils/book-states';

class Book extends Component {
  static defaultProps = {
      height: 193,
      width: 128,
      imageUrl: 'http://via.placeholder.com/350x150',
      title: '',
      authors: '',
      options: [
        {
          text: 'Move to...',
          value: null,
          disabled: true,
        },
        {
          text: 'Currently reading',
          value: READING,
          disabled: false,
        },
        {
          text: 'Want to read',
          value: WANT_TO_READ,
          disabled: false,
        },
        {
          text: 'Read',
          value: READ,
          disabled: false,
        },
        {
          text: 'None',
          value: NONE,
          disabled: false,
        }
      ],
  }

  render() {

    const {
      width,
      height,
      imageUrl,
      title,
      authors,
      shelf,
      switchShelf,
      options } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: width, height: height, backgroundImage: imageUrl }}>
          </div>
          <div className="book-shelf-changer">
            <Select value={shelf} switchShelf={switchShelf}>
              {options.map(option => (
                <Option
                  key={option.value}
                  value={option.value}
                  selected={option.selected}
                  text={option.text} />
              ))}
            </Select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
};

export default Book;
