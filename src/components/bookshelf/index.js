import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string
}

const Bookshelf = ({ children, title }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {children}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = propTypes;

export default Bookshelf;
