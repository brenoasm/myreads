import React, { Component } from 'react';
import Proptypes from 'prop-types';

import Select from 'components/select';
import Option from 'components/select-option';

import { READING, WANT_TO_READ, READ, NONE } from 'utils/shelves';

const propTypes = {
  width: Proptypes.number,
  height: Proptypes.number,
  imageUrl: Proptypes.string,
  authors: Proptypes.arrayOf(Proptypes.string),
  title: Proptypes.string.isRequired,
  switchShelf: Proptypes.func.isRequired,
  shelf({ shelf }) {
    return ([READING, WANT_TO_READ, READ, NONE].indexOf(shelf) !== -1) || (shelf === '') ? null : new Error();
  }
}

class Book extends Component {
  static defaultProps = {
      height: 193,
      width: 128,
      imageUrl: 'http://via.placeholder.com/350x150',
      title: '',
      authors: '',
      shelf: '',
  }

  render() {

    const options = [
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
    ];

    const {
      width,
      height,
      imageUrl,
      title,
      authors,
      shelf,
      switchShelf } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: width, height: height, backgroundImage: `url(${ imageUrl })` }}>
          </div>
          <div className="book-shelf-changer">
            <Select value={shelf} switchShelf={switchShelf}>
              {options.map((option, index) => (
                <Option
                  key={`${option.value}-${index}`}
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
}

Book.propTypes = propTypes;

export default Book;
